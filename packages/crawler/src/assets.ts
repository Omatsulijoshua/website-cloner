import type { CapturedPage } from "./types";

export type CapturedAssetKind = "logo" | "image" | "icon" | "font" | "video" | "document" | "stylesheet";

export type CapturedAsset = {
  id: string;
  kind: CapturedAssetKind;
  sourceUrl: string;
  originalPath: string;
  optimizedPath: string;
  contentType?: string;
  width?: number;
  height?: number;
  alt?: string;
  sourcePageUrl: string;
  usage: string[];
  notes: string[];
};

export type AssetPipelinePlan = {
  storage: "s3-compatible" | "cloudinary" | "local-export";
  generatedFolder: "public/assets";
  steps: string[];
  rewriteRules: string[];
  assets: CapturedAsset[];
};

const assetPatterns: Array<[CapturedAssetKind, RegExp]> = [
  ["image", /<img[^>]+src=["']([^"']+)["'][^>]*>/gi],
  ["icon", /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>/gi],
  ["font", /url\(["']?([^"')]+\.(?:woff2?|ttf|otf))["']?\)/gi],
  ["stylesheet", /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi]
];

export function buildAssetPipelinePlan(pages: CapturedPage[]): AssetPipelinePlan {
  const assets = pages.flatMap((page, pageIndex) => extractAssetsFromHtml(page.html, page.url, pageIndex));

  return {
    storage: "s3-compatible",
    generatedFolder: "public/assets",
    steps: [
      "Download public asset files from captured pages with original filenames preserved.",
      "Classify logos, icons, images, fonts, stylesheets, video, and documents.",
      "Store original files and generate optimized copies for Next.js public assets.",
      "Preserve dimensions, alt text, source URL, source page, and usage metadata.",
      "Rewrite generated components to reference local public/assets paths instead of hotlinking.",
      "Keep a manifest so users can replace logos and images after generation."
    ],
    rewriteRules: [
      "Use /assets/logos for logo-like image names or header/nav image usage.",
      "Use /assets/images for section images, product images, hero images, and cards.",
      "Use /assets/icons for favicons, SVG icons, and small UI marks.",
      "Use /assets/fonts for downloaded font files and generate @font-face declarations.",
      "Never copy protected/private assets, paywalled media, or assets behind failed verification."
    ],
    assets
  };
}

function extractAssetsFromHtml(html: string, pageUrl: string, pageIndex: number): CapturedAsset[] {
  const assets: CapturedAsset[] = [];
  const seen = new Set<string>();

  for (const [kind, pattern] of assetPatterns) {
    for (const match of html.matchAll(pattern)) {
      const sourceUrl = resolveAssetUrl(match[1], pageUrl);
      if (!sourceUrl || seen.has(sourceUrl)) continue;
      seen.add(sourceUrl);

      const filename = createAssetFilename(sourceUrl, kind, assets.length + 1);
      const folder = kind === "font" ? "fonts" : kind === "icon" ? "icons" : kind === "stylesheet" ? "styles" : "images";

      assets.push({
        id: `asset_${pageIndex}_${assets.length + 1}`,
        kind: inferLogoKind(kind, sourceUrl),
        sourceUrl,
        originalPath: `public/assets/original/${filename}`,
        optimizedPath: `public/assets/${folder}/${filename}`,
        sourcePageUrl: pageUrl,
        usage: [kind === "stylesheet" ? "style dependency" : "page asset"],
        notes: ["Captured only when public and authorized by the user permission flow."]
      });
    }
  }

  return assets;
}

function resolveAssetUrl(rawUrl: string, pageUrl: string) {
  try {
    return new URL(rawUrl, pageUrl).toString();
  } catch {
    return null;
  }
}

function createAssetFilename(sourceUrl: string, kind: CapturedAssetKind, fallbackIndex: number) {
  const parsed = new URL(sourceUrl);
  const name = parsed.pathname.split("/").filter(Boolean).pop() || `${kind}-${fallbackIndex}`;
  return name.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function inferLogoKind(kind: CapturedAssetKind, sourceUrl: string): CapturedAssetKind {
  return kind === "image" && /logo|brand|mark/i.test(sourceUrl) ? "logo" : kind;
}
