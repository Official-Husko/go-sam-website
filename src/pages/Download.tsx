import type { ComponentChildren } from 'preact'
import { useLatestRelease } from '../hooks/useLatestRelease'
import { useOS, type OS } from '../hooks/useOS'
import { useReveal } from '../hooks/useReveal'
import { latestReleaseAssetUrl, RELEASES_URL, SOURCE_ZIP_URL } from '../lib/constants'

const PLATFORMS: Record<Exclude<OS, null>, { label: string; filename: string; note: string }> = {
  windows: {
    label: 'Windows',
    filename: 'go-sam-windows-amd64.exe',
    note: 'Windows 10 or newer',
  },
  linux: {
    label: 'Linux',
    filename: 'go-sam-linux-amd64',
    note: 'x86_64, most modern distros',
  },
}

type Token = { text: string; tone?: 'cmd' | 'flag' | 'var' | 'str' }

function CodeLine({ tokens }: { tokens: Token[] }) {
  return (
    <span class="code-line">
      {tokens.map((t, i) => (t.tone ? <span key={i} class={`tok-${t.tone}`}>{t.text}</span> : t.text))}
    </span>
  )
}

function AltDownload({
  href,
  icon,
  variant,
  children,
}: {
  href: string
  icon: string
  variant?: 'windows' | 'linux'
  children: ComponentChildren
}) {
  return (
    <a
      class={`alt-download${variant ? ` alt-download--${variant}` : ''}`}
      href={href}
      target="_blank"
      rel="noopener"
    >
      <i class={icon} aria-hidden="true" />
      <span>{children}</span>
      <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
    </a>
  )
}

export function Download() {
  const os = useOS()
  const version = useLatestRelease()
  const other: Exclude<OS, null> | null = os === 'windows' ? 'linux' : os === 'linux' ? 'windows' : null

  const cards = useReveal<HTMLElement>()
  const build = useReveal<HTMLElement>()
  const cross = useReveal<HTMLElement>()

  return (
    <>
      <section class="page-intro">
        <div class="page-intro__heading">
          <h1>Download GO-SAM</h1>
          {version && (
            <a class="badge badge--outline" href={RELEASES_URL} target="_blank" rel="noopener">
              <i class="fa-solid fa-tag" aria-hidden="true" />
              {version}
            </a>
          )}
        </div>
        <p>Prebuilt binaries are published on the Releases page for every tagged version.</p>
      </section>

      <section class="section" ref={cards.ref}>
        <div class={cards.class}>
          {os ? (
            <>
              <div class={`primary-download primary-download--${os}`}>
                <i class={`fa-brands fa-${os}`} aria-hidden="true" />
                <div class="primary-download__body">
                  <div class="primary-download__heading">
                    <span>{PLATFORMS[os].label}</span>
                    <span class="badge">Your system</span>
                  </div>
                  <span class="primary-download__filename">{PLATFORMS[os].filename}</span>
                  <span class="primary-download__note">{PLATFORMS[os].note}</span>
                </div>
                <a class="btn btn--solid" href={latestReleaseAssetUrl(PLATFORMS[os].filename)} target="_blank" rel="noopener">
                  <i class="fa-solid fa-download" aria-hidden="true" />
                  Download for {PLATFORMS[os].label}
                </a>
              </div>

              <div class="alt-downloads">
                {other && (
                  <AltDownload
                    href={latestReleaseAssetUrl(PLATFORMS[other].filename)}
                    icon={`fa-brands fa-${other}`}
                    variant={other}
                  >
                    {PLATFORMS[other].label}
                  </AltDownload>
                )}
                <AltDownload href={SOURCE_ZIP_URL} icon="fa-solid fa-file-zipper">
                  Source code (.zip)
                </AltDownload>
              </div>
            </>
          ) : (
            <>
              <div class="download-grid">
                {(Object.keys(PLATFORMS) as Exclude<OS, null>[]).map((key) => (
                  <div class={`download-card download-card--${key}`} key={key}>
                    <i class={`fa-brands fa-${key}`} aria-hidden="true" />
                    <div>
                      <div class="download-card__heading">
                        <span>{PLATFORMS[key].label}</span>
                      </div>
                      <div class="download-card__filename">{PLATFORMS[key].filename}</div>
                    </div>
                    <a
                      class="btn btn--outline btn--block"
                      href={latestReleaseAssetUrl(PLATFORMS[key].filename)}
                      target="_blank"
                      rel="noopener"
                    >
                      <i class="fa-solid fa-download" aria-hidden="true" />
                      Download latest release
                    </a>
                    <span class="download-card__note">{PLATFORMS[key].note}</span>
                  </div>
                ))}
              </div>
              <div class="alt-downloads">
                <AltDownload href={SOURCE_ZIP_URL} icon="fa-solid fa-file-zipper">
                  Source code (.zip)
                </AltDownload>
              </div>
            </>
          )}
        </div>
      </section>

      <section class="section" ref={build.ref}>
        <div class={build.class}>
          <h2 class="subheading">Building from source</h2>
          <pre class="code-block">
            <code>
              <CodeLine
                tokens={[
                  { text: 'git', tone: 'cmd' },
                  { text: ' clone ' },
                  { text: 'https://github.com/Official-Husko/GO-SAM.git', tone: 'str' },
                ]}
              />
              <CodeLine tokens={[{ text: 'cd', tone: 'cmd' }, { text: ' GO-SAM' }]} />
              <CodeLine
                tokens={[
                  { text: 'go', tone: 'cmd' },
                  { text: ' build ' },
                  { text: '-o', tone: 'flag' },
                  { text: ' go-sam ' },
                  { text: './cmd/go-sam', tone: 'str' },
                ]}
              />
            </code>
          </pre>
        </div>
      </section>

      <section class="section" ref={cross.ref}>
        <div class={cross.class}>
          <h2 class="subheading">Cross-compiling for Windows (from Linux/macOS)</h2>
          <p class="section-lead">
            Building the GUI requires cgo for Fyne's rendering, so you'll need a Windows C cross-compiler such as
            mingw-w64.
          </p>
          <pre class="code-block">
            <code>
              <CodeLine
                tokens={[
                  { text: 'CGO_ENABLED=1', tone: 'var' },
                  { text: ' ' },
                  { text: 'GOOS=windows', tone: 'var' },
                  { text: ' ' },
                  { text: 'GOARCH=amd64', tone: 'var' },
                  { text: ' ' },
                  { text: 'CC=x86_64-w64-mingw32-gcc', tone: 'var' },
                  { text: ' \\' },
                ]}
              />
              <CodeLine
                tokens={[
                  { text: '  go', tone: 'cmd' },
                  { text: ' build ' },
                  { text: '-o', tone: 'flag' },
                  { text: ' go-sam.exe ' },
                  { text: './cmd/go-sam', tone: 'str' },
                ]}
              />
            </code>
          </pre>
          <div class="badge-row">
            <span class="badge badge--linux">
              <i class="fa-brands fa-linux" aria-hidden="true" />
              Linux build passing
            </span>
            <span class="badge badge--windows">
              <i class="fa-brands fa-windows" aria-hidden="true" />
              Windows build passing
            </span>
            <span class="badge badge--outline">
              <i class="fa-solid fa-scale-balanced" aria-hidden="true" />
              zlib license
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
