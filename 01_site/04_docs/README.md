# Flexity Gym Landing Clone

Exact static deployment of the Vercel site at `https://flexity-gym-landing.vercel.app`.

## Structure

- `index.html`: app entrypoint copied from the target deployment
- `01_site/02_assets/`: CSS, JavaScript y medios del sitio, agrupados por utilidad
- `vercel.json`: static file handling plus SPA fallback to `index.html`

## Deploy

Deploy the repository root to Vercel as a static site. No build step is required.
