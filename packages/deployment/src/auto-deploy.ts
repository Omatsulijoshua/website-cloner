export type AutoDeployRequest = {
  projectId: string;
  projectName: string;
  github: {
    owner: string;
    repo: string;
    branch?: string;
    tokenConfigured: boolean;
  };
  vercel: {
    projectName: string;
    teamSlug?: string;
    tokenConfigured: boolean;
  };
  render?: {
    serviceName: string;
    tokenConfigured: boolean;
    includeBackend: boolean;
  };
};

export type AutoDeployStep = {
  id: string;
  provider: "github" | "vercel" | "render";
  label: string;
  status: "ready" | "blocked";
  details: string;
};

export type AutoDeployPlan = {
  mode: "git-connected";
  projectId: string;
  ready: boolean;
  requiredSecrets: string[];
  steps: AutoDeployStep[];
};

export function createAutoDeployPlan(request: AutoDeployRequest): AutoDeployPlan {
  const requiredSecrets = [
    request.github.tokenConfigured ? null : "GITHUB_TOKEN",
    request.vercel.tokenConfigured ? null : "VERCEL_TOKEN",
    request.render?.includeBackend && !request.render.tokenConfigured ? "RENDER_API_KEY" : null
  ].filter(Boolean) as string[];

  const steps: AutoDeployStep[] = [
    {
      id: "github-create-repo",
      provider: "github",
      label: "Create or update GitHub repository",
      status: request.github.tokenConfigured ? "ready" : "blocked",
      details: `Push generated code to ${request.github.owner}/${request.github.repo} on ${request.github.branch ?? "main"}.`
    },
    {
      id: "vercel-connect-git",
      provider: "vercel",
      label: "Create Vercel project from GitHub",
      status: request.vercel.tokenConfigured && request.github.tokenConfigured ? "ready" : "blocked",
      details: `Connect Vercel project ${request.vercel.projectName} to the GitHub repo and deploy the frontend.`
    }
  ];

  if (request.render?.includeBackend) {
    steps.push({
      id: "render-connect-git",
      provider: "render",
      label: "Create Render backend service from GitHub",
      status: request.render.tokenConfigured && request.github.tokenConfigured ? "ready" : "blocked",
      details: `Create Render service ${request.render.serviceName}, connect it to the backend folder, and set env vars.`
    });
  }

  return {
    mode: "git-connected",
    projectId: request.projectId,
    ready: requiredSecrets.length === 0,
    requiredSecrets,
    steps
  };
}
