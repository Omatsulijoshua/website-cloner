const steps = [
  "Validating URL",
  "Checking permission",
  "Capturing page",
  "Extracting assets",
  "Taking screenshots",
  "Analyzing layout",
  "Generating components",
  "Applying AI improvements",
  "Building project",
  "Pushing to GitHub",
  "Deploying to Vercel",
  "Backend deployment to Render",
  "Complete"
];

export function ProgressRail() {
  return (
    <div className="grid gap-2">
      {steps.map((step, index) => (
        <div
          className="progress-step flex items-center justify-between rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-steel"
          data-active={index < 5}
          key={step}
        >
          <span>{step}</span>
          <span className="tabular-nums">{index < 4 ? "done" : index === 4 ? "now" : "next"}</span>
        </div>
      ))}
    </div>
  );
}
