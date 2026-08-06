import { SectionHeading } from '../components/SectionHeading'
import { Steps } from '../components/Steps'
import { useLatestRelease } from '../hooks/useLatestRelease'
import { useOS } from '../hooks/useOS'
import { useReveal } from '../hooks/useReveal'
import managerScreenshot from '../assets/screenshots/manager.png'
import pickerScreenshot from '../assets/screenshots/picker.png'
import { GITHUB_URL, RELEASES_URL } from '../lib/constants'
import { Link } from '../router'

const FEATURES = [
  {
    icon: 'fa-table-cells',
    title: 'Browse your library',
    body: 'Lists games you own, pulled from the official Steam Web API and cached locally.',
  },
  {
    icon: 'fa-trophy',
    title: 'Edit achievements',
    body: 'View unlock status and timestamps. Toggle, lock, unlock or invert in bulk, filter by name or state.',
  },
  {
    icon: 'fa-chart-simple',
    title: 'Edit stats',
    body: "View and modify a game's numeric and float stats, respecting the ones a game marks as protected.",
  },
  {
    icon: 'fa-arrows-rotate',
    title: 'Reset stats',
    body: 'Reset all stats (and optionally achievements) for a game, with confirmation.',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Native on both platforms',
    body: 'One Go binary, no cgo for the Steam interop layer, works the same way on Windows and Linux.',
  },
  {
    icon: 'fa-bell',
    title: 'In-app changelog',
    body: "Checks GitHub for release notes on startup and shows what's new.",
  },
]

const STATS = [
  {
    icon: 'fa-layer-group',
    title: 'Windows & Linux',
    body: 'One Go binary, native on both, no separate rewrite per platform',
  },
  {
    icon: 'fa-cube',
    title: 'No .NET Framework',
    body: 'A from-scratch reimplementation, not a wrapper around the original',
  },
  {
    icon: 'fa-plug',
    title: 'No cgo for Steam interop',
    body: 'Talks to steamclient directly via purego, not the Steamworks SDK',
  },
]

const HOW_STEPS = [
  'Reads your owned-games list from the official Steam Web API.',
  <>
    Talks to your running Steam client through its native library: <code>steamclient.dll</code> on Windows,{' '}
    <code>steamclient.so</code> on Linux.
  </>,
  'Parses the achievement and stat schema Steam already caches locally for each game you own.',
]

const REQUIREMENTS = [
  <>
    The <strong>Steam client</strong> installed and running, with you logged in.
  </>,
  <>
    A free <strong>Steam Web API key</strong>, entered once via the in-app Settings screen.
  </>,
  <>
    <strong>Go 1.26+</strong>, only if building from source.
  </>,
]

export function Landing() {
  const os = useOS()
  const version = useLatestRelease()
  const downloadLabel = os === 'windows' ? 'Download for Windows' : os === 'linux' ? 'Download for Linux' : 'Download'

  const stat = useReveal<HTMLElement>()
  const features = useReveal<HTMLElement>()
  const how = useReveal<HTMLElement>()
  const preview = useReveal<HTMLElement>()
  const requirements = useReveal<HTMLElement>()

  return (
    <>
      <section class="hero">
        <div class="hero__copy">
          <div class="pill hero__pill">
            <span class="pill__tag">Legacy build</span>
            <span>A UI revamp is planned next</span>
          </div>
          <h1 class="hero__title">GO-SAM</h1>
          <p class="hero__tagline">A modern, cross-platform port of Steam Achievement Manager.</p>
          <p class="hero__desc">
            View and toggle achievements, and edit stats, for any game you own, by talking directly to your local
            Steam client, the same way a game itself would. Native on Windows and Linux, no .NET Framework required.
          </p>
          <div class="hero__actions">
            <Link to="/download" class="btn btn--outline">
              <i class="fa-solid fa-download" aria-hidden="true" />
              {downloadLabel}
            </Link>
            <a class="btn btn--ghost" href={GITHUB_URL} target="_blank" rel="noopener">
              <i class="fa-brands fa-github" aria-hidden="true" />
              View source
            </a>
          </div>
          <div class="hero__platforms">
            <span class="tag tag--windows">
              <i class="fa-brands fa-windows" aria-hidden="true" />
              Windows
            </span>
            <span class="tag tag--linux">
              <i class="fa-brands fa-linux" aria-hidden="true" />
              Linux
            </span>
            {version && (
              <a class="tag" href={RELEASES_URL} target="_blank" rel="noopener">
                <i class="fa-solid fa-tag" aria-hidden="true" />
                {version}
              </a>
            )}
            <span class="hero__note">Requires the Steam client installed and running</span>
          </div>
        </div>
        <div class="hero__art">
          <div class="hero__glow" aria-hidden="true" />
          <div class="hero__frame">
            <img src={pickerScreenshot} alt="GO-SAM picker window listing owned games" width="1030" height="733" />
          </div>
        </div>
      </section>

      <section class="stat-bar" ref={stat.ref}>
        <div class={`stat-bar__inner ${stat.class}`}>
          {STATS.map((item) => (
            <div class="stat-bar__item" key={item.title}>
              <i class={`fa-solid ${item.icon}`} aria-hidden="true" />
              <div class="stat-bar__title">{item.title}</div>
              <div class="stat-bar__body">{item.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section class="section" ref={features.ref}>
        <div class={features.class}>
          <SectionHeading eyebrow="Features" title="What it does" />
          <div class="feature-grid">
            {FEATURES.map((feature) => (
              <div class="feature-card" key={feature.title}>
                <i class={`fa-solid ${feature.icon}`} aria-hidden="true" />
                <div class="feature-card__title">{feature.title}</div>
                <p>{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="section section--split" ref={how.ref}>
        <div class={how.class}>
          <SectionHeading eyebrow="How it works" title="Talks to Steam like a game would" />
          <p class="section-lead">
            Instead of the public Steamworks SDK (which needs each game's own credentials), go-sam talks directly to
            your locally installed Steam client's native library, the same low-level approach the original SAM used.
            On Go, this happens without cgo, using purego to call the client library's functions directly.
          </p>
        </div>
        <Steps items={HOW_STEPS} />
      </section>

      <section class="section" ref={preview.ref}>
        <div class={preview.class}>
          <SectionHeading eyebrow="Preview" title="See it in action" />
          <div class="preview-grid">
            <figure>
              <div class="preview-frame">
                <img src={pickerScreenshot} alt="GO-SAM picker window listing owned games" width="1030" height="733" />
              </div>
              <figcaption>Picker: owned-games list</figcaption>
            </figure>
            <figure>
              <div class="preview-frame">
                <img
                  src={managerScreenshot}
                  alt="GO-SAM manager window showing achievements for a game"
                  width="1030"
                  height="733"
                />
              </div>
              <figcaption>Manager: achievements &amp; stats editor</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="section" ref={requirements.ref}>
        <div class={requirements.class}>
          <SectionHeading eyebrow="Requirements" title="Before you start" />
          <ul class="checklist">
            {REQUIREMENTS.map((item, i) => (
              <li key={i}>
                <i class="fa-solid fa-check" aria-hidden="true" />
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
