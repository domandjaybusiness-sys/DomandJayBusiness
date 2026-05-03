# Cloudflare deployment notes

This project uses:

- `public/_redirects` for SPA routing
- `public/_routes.json` to keep Pages Functions scoped to `/api/*`
- `functions/api/*` for Cloudflare Pages Functions
- `wrangler.toml` for local/dev and deploy metadata

## Required Cloudflare variables

Set these in your Cloudflare Pages or Workers project:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `ADMIN_PASSWORD`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SITE_ORIGIN`

For the frontend build, also set:

- `VITE_SITE_URL`

`SITE_ORIGIN` should match the public origin used by Stripe checkout redirects, for example:

- `https://domandjaybusiness.pages.dev`

## Local development

Use `.dev.vars` for function secrets and `.env` for Vite variables.

Example files are included:

- `.dev.vars.example`
- `.env.example`

## Cloudflare URL

If you want to use the default Cloudflare Pages hostname, set:

- `VITE_SITE_URL=https://domandjaybusiness.pages.dev`
- `SITE_ORIGIN=https://domandjaybusiness.pages.dev`

If your actual Pages project uses a different `*.pages.dev` hostname or a custom domain, replace both values with that exact URL.
