# Elevate Training Mirror

Static mirror of `www.elevatetraining.com` prepared for deployment on Vercel.

## Structure

- `www.elevatetraining.com/`: mirrored HTML pages
- `static.parastorage.com/`: mirrored Wix runtime assets
- `static.wixstatic.com/`: mirrored Wix media assets
- `browser.sentry-cdn.com/`: mirrored Sentry asset used by the site
- `vercel.json`: route mapping from clean URLs to mirrored HTML files

## Deploy

Deploy the repository root to Vercel as a static site. No build step is required.

