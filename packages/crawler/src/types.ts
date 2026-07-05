export type ProtectionKind = "cloudflare" | "captcha" | "bot-verification" | "login" | "paywall";

export type CapturePause = {
  action: "pause-for-manual-verification";
  protection: ProtectionKind;
  message: string;
  logCode: "MANUAL_VERIFICATION_REQUIRED";
};

export type VisualAnalysis = {
  typography: {
    fonts: string[];
    fontSizes: string[];
    weights: string[];
    lineHeights: string[];
    pairings: string[];
  };
  colors: {
    palette: string[];
    gradients: string[];
    shadows: string[];
    borders: string[];
    glassEffects: string[];
    backgrounds: string[];
  };
  layout: {
    sections: string[];
    spacingScale: string[];
    cards: number;
    forms: string[];
    navbars: number;
    footers: number;
    responsiveBreakpoints: string[];
  };
  interactions: {
    buttons: string[];
    hoverEffects: string[];
    animations: string[];
    scrollEffects: string[];
    transitionTiming: string[];
  };
  assets: {
    logos: string[];
    icons: string[];
    images: string[];
    fonts: string[];
  };
  seo: {
    title?: string;
    description?: string;
    openGraph: Record<string, string>;
  };
};

export type DetectedSiteFeature =
  | "contact-form"
  | "newsletter-form"
  | "booking-form"
  | "product-listings"
  | "blog-news"
  | "login-signup"
  | "dashboard"
  | "admin-panel"
  | "payment"
  | "search-filter"
  | "file-upload";

export type CapturedPage = {
  url: string;
  html: string;
  screenshotPath?: string;
  metadata: VisualAnalysis;
  features: DetectedSiteFeature[];
};
