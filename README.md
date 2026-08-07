# GO-SAM Website

**Live site: [go-sam.lonewolves.dev](https://go-sam.lonewolves.dev/)**

The showcase website for [GO-SAM](https://github.com/Official-Husko/GO-SAM), a modern, cross-platform port of Steam Achievement Manager written in Go. This repo is just the site (overview, download, and docs pages) — for the actual application, see the [GO-SAM repository](https://github.com/Official-Husko/GO-SAM).

## Tech stack

- [Preact](https://preactjs.com/) + TypeScript
- [Vite](https://vite.dev/) for dev/build tooling
- No CSS framework — hand-written CSS with a small set of custom properties for theming
- Font Awesome 7 Pro (trimmed to the handful of icons actually used, see `src/css/icons.css`)
- A tiny custom client-side router (`src/router.tsx`) instead of a routing library

## Pages

- **Overview** (`/`) — hero, feature grid, how-it-works, screenshots, requirements
- **Download** (`/download`) — platform-specific download (auto-detected from the browser), build-from-source instructions
- **Docs** (`/docs`) — usage, configuration, disclaimer, credits

The latest release version shown on the Overview and Download pages is fetched live from the GitHub API at runtime (`src/hooks/useLatestRelease.ts`) — it isn't hardcoded.

## Local development

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run preview   # preview the production build locally
```

## SEO

This is a client-only SPA (no SSR), so `npm run build` runs an extra step after `vite build`: [`scripts/prerender-meta.mjs`](scripts/prerender-meta.mjs) clones the built `index.html` into `dist/download/index.html` and `dist/docs/index.html`, swapping in route-specific `<title>`, description, canonical URL, and Open Graph/Twitter tags. nginx's `try_files $uri $uri/ /index.html` (see `docker/nginx.conf`) serves these directly for a request to e.g. `/download`, so search engines and link-preview bots that don't execute JS still see correct per-page metadata instead of every route sharing the homepage's.

Also included: `public/robots.txt`, `public/sitemap.xml`, a JSON-LD `SoftwareApplication` block in `index.html`, and a generated `public/og-image.png` used for link previews.

## Docker

The site builds to static files and is served by nginx. Releases are distributed as a Docker image tarball (see CI/CD below), not pushed to a registry, so running one is a load + compose up:

```bash
docker load < official-husko-go-sam-website-<sha>.tar.gz
docker compose up
```

That loads two tags — `official-husko-go-sam-website:<sha>` and `official-husko-go-sam-website:latest` — and `docker-compose.yml` runs the `:latest` one on `http://localhost:8080`. `docker-compose.yml` does not build anything itself; it only ever runs an image that's already been loaded.

To build the image from source yourself instead:

```bash
docker build -t go-sam-website .
docker run --rm -p 8080:80 go-sam-website
```

- `Dockerfile` — multi-stage build: Node builds the static site, then an `nginx:alpine` image serves it
- `docker/nginx.conf` — SPA fallback routing, gzip, and long-lived caching for hashed build assets
- `docker-compose.yml` — runs the prebuilt `official-husko-go-sam-website:latest` image on port 8080

## CI/CD

On every push to `main`, [`.github/workflows/release.yml`](.github/workflows/release.yml):

1. Builds the Docker image, tagged both `<repo>:<short-sha>` and `<repo>:latest`
2. Saves both tags into one `.tar.gz` with `docker save`
3. Publishes a GitHub Release tagged with the short commit SHA, with that tarball attached as the release asset

No container registry is involved — `docker load` on the tarball, as shown above, is all a deployment needs.

## License

This website's source code is licensed under a [modified, non-commercial MIT license](LICENSE): free to use, modify, and redistribute, but not for commercial or monetary purposes, and any distributed copy or derivative must keep its source available and remain free to access. GO-SAM itself (the application) is a separate project licensed under the zlib license; see the [GO-SAM repository](https://github.com/Official-Husko/GO-SAM) for details.

## Disclaimer

Unofficial, fan-made, not affiliated with Valve.
