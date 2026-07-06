# Auto Deploy From Git

CloneForge AI uses Git as the source of truth for deployment.

## Flow

1. Generate the frontend and optional backend code.
2. Commit generated code to GitHub.
3. Create or update a Vercel project connected to the GitHub repository.
4. If a backend was generated, create or update a Render service connected to the same GitHub repository.
5. Add environment variables to Vercel and Render.
6. Trigger deployments from Git commits.

## Required Keys

```env
GITHUB_TOKEN=
VERCEL_TOKEN=
RENDER_API_KEY=
```

## API Contracts

Asset planning:

```http
POST /api/projects/:id/assets/plan
```

Auto-deploy planning:

```http
POST /api/projects/:id/deployments/auto
```

The auto-deploy endpoint returns which steps are ready or blocked based on configured credentials.

## GitHub

GitHub receives the generated code and commit history. Every AI correction can become a new commit.

## Vercel

Vercel should connect to the GitHub repo and deploy the generated frontend from the configured frontend folder.

## Render

Render should connect to the GitHub repo and deploy the generated backend service only when the backend generator detects dynamic features.
