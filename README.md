# GO-SAM Website

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

## Docker

The site builds to static files and is served by nginx. To build and run it locally:

```bash
docker build -t go-sam-website .
docker run --rm -p 8080:80 go-sam-website
```

Then open `http://localhost:8080`.

- `Dockerfile` — multi-stage build: Node builds the static site, then an `nginx:alpine` image serves it
- `docker/nginx.conf` — SPA fallback routing, gzip, and long-lived caching for hashed build assets

## CI/CD

On every push to `main`, [`.github/workflows/release.yml`](.github/workflows/release.yml):

1. Builds the Docker image
2. Saves it to a `.tar.gz` with `docker save`
3. Publishes a GitHub Release tagged with the short commit SHA, with that tarball attached as the release asset

No container registry is involved. To deploy a given build (e.g. from release tag `abc1234`):

```bash
docker load < official-husko-go-sam-website-abc1234.tar.gz
docker run --rm -p 8080:80 official-husko-go-sam-website:abc1234
```

## License

This website's source code is licensed under a [modified, non-commercial MIT license](LICENSE): free to use, modify, and redistribute, but not for commercial or monetary purposes, and any distributed copy or derivative must keep its source available and remain free to access. GO-SAM itself (the application) is a separate project licensed under the zlib license; see the [GO-SAM repository](https://github.com/Official-Husko/GO-SAM) for details.

## Disclaimer

Unofficial, fan-made, not affiliated with Valve.
