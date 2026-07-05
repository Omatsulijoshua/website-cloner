import type { CapturedPage } from "@cloneforge/crawler";

export type FrontendGenerationSpec = {
  framework: "nextjs" | "vite";
  styling: "tailwind" | "tailwind-shadcn";
  pages: CapturedPage[];
  requirements: string[];
};

export function buildFrontendRequirements(pages: CapturedPage[]): string[] {
  return [
    "Recreate typography, font pairings, font sizes, weights, and line heights.",
    "Recreate color palette, gradients, shadows, borders, glass effects, and backgrounds.",
    "Preserve logo placement, sizing, spacing, and visual treatment.",
    "Recreate public text only when the user has permission.",
    "Recreate button styles, hover effects, animations, scroll effects, and transition timing.",
    "Recreate layout spacing, section structure, cards, forms, navbars, footers, and responsive behavior.",
    "Place icons, images, SEO title, description, and Open Graph metadata.",
    `Generate ${pages.length} captured page(s) as clean reusable components.`
  ];
}
