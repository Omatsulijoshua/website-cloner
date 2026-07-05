import { isSensitiveCloneTarget } from "@cloneforge/config";
import type { CapturePause, ProtectionKind } from "./types";

const protectionMarkers: Array<[ProtectionKind, RegExp]> = [
  ["cloudflare", /cf-browser-verification|cloudflare|checking your browser|attention required/i],
  ["captcha", /captcha|recaptcha|hcaptcha|turnstile/i],
  ["bot-verification", /human verification|verify you are human|bot detection|automated traffic/i],
  ["paywall", /subscribe to continue|paywall|members only/i]
];

export function validateClonePermission(input: { url: string; hasPermission: boolean }) {
  if (!input.hasPermission) {
    return {
      allowed: false,
      reason: "A legal permission checkbox is required before cloning can start."
    };
  }

  const parsed = new URL(input.url);
  if (isSensitiveCloneTarget(parsed.hostname)) {
    return {
      allowed: false,
      reason: "This domain matches the phishing-sensitive blocklist and cannot be cloned by default."
    };
  }

  return { allowed: true, reason: "Allowed" };
}

export function detectProtection(html: string, headers: Record<string, string | string[] | undefined> = {}) {
  const headerText = Object.entries(headers)
    .map(([key, value]) => `${key}:${Array.isArray(value) ? value.join(",") : value ?? ""}`)
    .join("\n");
  const searchable = `${headerText}\n${html}`;

  const match = protectionMarkers.find(([, pattern]) => pattern.test(searchable));
  return match?.[0];
}

export function createManualVerificationPause(protection: ProtectionKind): CapturePause {
  return {
    action: "pause-for-manual-verification",
    protection,
    logCode: "MANUAL_VERIFICATION_REQUIRED",
    message:
      "Manual verification is required. Open the embedded browser, complete the challenge yourself, then resume capture."
  };
}
