import type { DetectedSiteFeature, VisualAnalysis } from "./types";

export function analyzeHtmlForFeatures(html: string): DetectedSiteFeature[] {
  const lower = html.toLowerCase();
  const features = new Set<DetectedSiteFeature>();

  if (/<form[\s>]/i.test(html) && /(contact|message|textarea|name=.?email)/i.test(html)) features.add("contact-form");
  if (/(newsletter|subscribe|mailchimp|email updates)/i.test(html)) features.add("newsletter-form");
  if (/(booking|reservation|appointment|calendar|date picker)/i.test(html)) features.add("booking-form");
  if (/(add to cart|product|sku|price|shop|catalog)/i.test(html)) features.add("product-listings");
  if (/(blog|article|news|post-card|published)/i.test(html)) features.add("blog-news");
  if (/(login|sign in|signup|register|password)/i.test(html)) features.add("login-signup");
  if (/(dashboard|analytics|account overview|sidebar)/i.test(html)) features.add("dashboard");
  if (/(admin|manage users|cms|moderation)/i.test(html)) features.add("admin-panel");
  if (/(checkout|payment|stripe|paystack|card number)/i.test(html)) features.add("payment");
  if (/(search|filter|sort by|facets)/i.test(html)) features.add("search-filter");
  if (/(type=.file.|upload|dropzone)/i.test(html)) features.add("file-upload");

  if (lower.includes("private message") || lower.includes("card number")) {
    features.delete("dashboard");
  }

  return [...features];
}

export function createVisualAnalysisFromDomSnapshot(input: {
  title?: string;
  description?: string;
  openGraph?: Record<string, string>;
  fonts?: string[];
  colors?: string[];
}): VisualAnalysis {
  return {
    typography: {
      fonts: input.fonts ?? [],
      fontSizes: [],
      weights: [],
      lineHeights: [],
      pairings: []
    },
    colors: {
      palette: input.colors ?? [],
      gradients: [],
      shadows: [],
      borders: [],
      glassEffects: [],
      backgrounds: []
    },
    layout: {
      sections: [],
      spacingScale: [],
      cards: 0,
      forms: [],
      navbars: 0,
      footers: 0,
      responsiveBreakpoints: []
    },
    interactions: {
      buttons: [],
      hoverEffects: [],
      animations: [],
      scrollEffects: [],
      transitionTiming: []
    },
    assets: {
      logos: [],
      icons: [],
      images: [],
      fonts: []
    },
    seo: {
      title: input.title,
      description: input.description,
      openGraph: input.openGraph ?? {}
    }
  };
}
