import { Queue, Worker } from "bullmq";
import { generateBackendPlan, buildFrontendRequirements } from "@cloneforge/ai";
import {
  analyzeHtmlForFeatures,
  createManualVerificationPause,
  createVisualAnalysisFromDomSnapshot,
  detectProtection
} from "@cloneforge/crawler";

type CloneJob = {
  projectId: string;
  url: string;
  backendMode: "auto" | "frontend-only" | "always";
};

const connection = {
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
  maxRetriesPerRequest: null
};

export const cloneQueue = new Queue<CloneJob>("clone-projects", { connection });

export const cloneWorker = new Worker<CloneJob>(
  "clone-projects",
  async (job) => {
    const response = await fetch(job.data.url, {
      headers: {
        "user-agent": "CloneForgeAI/0.1 authorized capture bot"
      }
    });
    const html = await response.text();
    const protection = detectProtection(html, Object.fromEntries(response.headers.entries()));

    if (protection) {
      return {
        status: "Paused For Verification",
        projectId: job.data.projectId,
        pause: createManualVerificationPause(protection)
      };
    }

    const features = analyzeHtmlForFeatures(html);
    const page = {
      url: job.data.url,
      html,
      metadata: createVisualAnalysisFromDomSnapshot({
        title: extractTitle(html),
        description: extractMeta(html, "description"),
        openGraph: extractOpenGraph(html)
      }),
      features
    };

    const backendPlan =
      job.data.backendMode === "frontend-only" ? null : generateBackendPlan(features);

    return {
      status: "Building",
      projectId: job.data.projectId,
      capturedPage: page,
      frontendRequirements: buildFrontendRequirements([page]),
      backendPlan
    };
  },
  { connection }
);

function extractTitle(html: string) {
  return html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]?.trim();
}

function extractMeta(html: string, name: string) {
  const pattern = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i");
  return html.match(pattern)?.[1]?.trim();
}

function extractOpenGraph(html: string) {
  const openGraph: Record<string, string> = {};
  for (const match of html.matchAll(/<meta[^>]+property=["']og:([^"']+)["'][^>]+content=["']([^"']+)["']/gi)) {
    openGraph[match[1]] = match[2];
  }
  return openGraph;
}

cloneWorker.on("failed", (job, error) => {
  console.error("Clone job failed", { jobId: job?.id, error: error.message });
});
