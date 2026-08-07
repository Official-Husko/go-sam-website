// Post-build step: this is a client-only SPA (no SSR), so every route is
// served from the same dist/index.html and shares one <head>. Crawlers and
// link-unfurlers that don't execute JS (search engines to varying degrees,
// and virtually all social-media preview bots) would otherwise see the same
// title/description/OG tags no matter which page was actually requested.
//
// To fix that without adding a real SSR/SSG pipeline, this script clones the
// built index.html into dist/<route>/index.html per non-home route, with
// route-specific <title>/description/OG/Twitter/canonical tags swapped in.
// nginx's `try_files $uri $uri/ /index.html` then serves these static files
// directly for a request to e.g. /download, before any JS ever runs.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://go-sam.lonewolves.dev'
const DIST_DIR = join(import.meta.dirname, '..', 'dist')

const ROUTES = [
  {
    path: 'download',
    title: 'Download | GO-SAM',
    description:
      'Download prebuilt GO-SAM binaries for Windows and Linux, or build it from source. A native, cross-platform Steam Achievement Manager written in Go.',
  },
  {
    path: 'docs',
    title: 'Docs | GO-SAM',
    description:
      'Usage and configuration for GO-SAM: run the Picker, set your Steam Web API key, and edit achievements and stats for any game you own.',
  },
]

function replaceMetaContent(html, attrMatcher, value) {
  const re = new RegExp(`(<meta[^>]*?${attrMatcher}[^>]*?content=")[^"]*("[^>]*>)`)
  return html.replace(re, `$1${value}$2`)
}

const baseHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8')

for (const route of ROUTES) {
  const url = `${SITE_URL}/${route.path}`
  let html = baseHtml

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/>)/, `$1${url}$2`)
  html = replaceMetaContent(html, 'name="description"', route.description)
  html = replaceMetaContent(html, 'property="og:url"', url)
  html = replaceMetaContent(html, 'property="og:title"', route.title)
  html = replaceMetaContent(html, 'property="og:description"', route.description)
  html = replaceMetaContent(html, 'name="twitter:title"', route.title)
  html = replaceMetaContent(html, 'name="twitter:description"', route.description)

  const outDir = join(DIST_DIR, route.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  console.log(`prerendered meta for /${route.path}`)
}
