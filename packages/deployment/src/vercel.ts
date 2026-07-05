export type VercelDeployRequest = {
  token: string;
  projectName: string;
  gitRepositoryUrl: string;
  environmentVariables: Record<string, string>;
};

export async function deployFrontendToVercel(_request: VercelDeployRequest) {
  return {
    provider: "vercel",
    status: "pending-credentials",
    message: "Vercel deployment boundary is ready for project creation, env vars, and deploy URL retrieval."
  };
}
