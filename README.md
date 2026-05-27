# freiluft-festival

Website for the freiluft festival, built with Next.js 15 (App Router) and Storyblok CMS, deployed on Vercel.

## Setup

```bash
pnpm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_STORYBLOK_TOKEN
pnpm dev
```

## Scripts

```bash
pnpm dev      # local dev server on http://localhost:3000
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # eslint
```

## Environment

| Variable                        | Required | Description                                   |
| ------------------------------- | -------- | --------------------------------------------- |
| `NEXT_PUBLIC_STORYBLOK_TOKEN`   | yes      | Storyblok preview/public access token         |
| `NEXT_PUBLIC_STORYBLOK_VERSION` | no       | `draft` (default in non-prod) or `published`  |

## Deployment

Deployed on Vercel. The `master` branch deploys to production; PRs get preview URLs automatically. Set the env vars above in the Vercel project settings.
