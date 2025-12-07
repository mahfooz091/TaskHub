# Vercel Deployment Checklist for TaskHub (frontend)

This document lists the minimal steps and environment settings required to deploy the `frontend` app to Vercel.

1) Preferred package manager
- The repository contains `pnpm-lock.yaml` so Vercel will use `pnpm` by default. If you prefer npm, remove `pnpm-lock.yaml` and add `package-lock.json` instead.

2) Node version
- The project `package.json` includes an `engines.node` entry recommending Node >= 18. Set the Project's Node version in Vercel to `18.x` or let Vercel infer it from `package.json`.

3) Build command & Output
- Build command: `pnpm run vercel-build` (or `pnpm build`).
- Output: Next.js handles the output directory (`.next`). No special output setting needed.

4) Environment variables (set these in Vercel > Project > Settings > Environment Variables)
- `NEXT_PUBLIC_API_URL` — the public URL for your backend API (example: `https://api.yourdomain.com`).
- Any OAuth client IDs / secrets or other public keys used by the frontend.

Notes:
- Keep `NEXT_PUBLIC_API_URL` as a `NEXT_PUBLIC_*` variable so it gets embedded into the client build.
- Do NOT commit secret values to the repo.

5) CORS and Backend availability
- Ensure the backend (FastAPI) is deployed & reachable at the URL you set for `NEXT_PUBLIC_API_URL`.
- Backend must allow CORS from the Vercel domain. Example FastAPI CORS config:

```py
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-project.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

6) Recommended repo settings
- Ensure `pnpm-lock.yaml` is present (preferred) and `package-lock.json` is removed to avoid detection conflicts.
- Set the Vercel Project to connect to the `main` branch and enable Automatic Deploys.

7) Post-deploy checks
- Verify the frontend loads and that API calls to `NEXT_PUBLIC_API_URL` succeed (open the browser console and network tab).
- If authentication fails due to cookies or same-site settings, check backend auth token cookie settings.

8) Useful local verification commands (run in `frontend/`):
```bash
# install with pnpm
pnpm install
# build (production)
pnpm run vercel-build
# run production server
pnpm run start
```

If you want, I can:
- Commit and push these changes to `main` for you.
- Run a local production build here and fix any build errors.
- Add a `vercel.json` with custom build/runtime config if you need special rewrites or headers.

