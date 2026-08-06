import { useOS } from '../hooks/useOS'
import { GITHUB_URL } from '../lib/constants'
import { Link, useRouter, type Route } from '../router'

const NAV_ITEMS: { to: Route; label: string }[] = [
  { to: '/', label: 'Overview' },
  { to: '/download', label: 'Download' },
  { to: '/docs', label: 'Docs' },
]

export function Header() {
  const { path } = useRouter()
  const os = useOS()
  const downloadLabel = os === 'windows' ? 'Download for Windows' : os === 'linux' ? 'Download for Linux' : 'Download'

  return (
    <header class="site-header">
      <div class="site-header__inner">
        <Link to="/" class="brand">
          <span class="brand__mark">
            <img src="/favicon.svg" alt="" width="18" height="18" />
          </span>
          <span class="brand__name">GO-SAM</span>
        </Link>

        <nav class="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} class={`site-nav__link${path === item.to ? ' is-active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <a class="icon-btn" href={GITHUB_URL} target="_blank" rel="noopener" aria-label="View source on GitHub">
          <i class="fa-brands fa-github" aria-hidden="true" />
        </a>

        <Link to="/download" class="btn btn--outline btn--nav">
          <i class="fa-solid fa-download" aria-hidden="true" />
          <span>{downloadLabel}</span>
        </Link>
      </div>
    </header>
  )
}
