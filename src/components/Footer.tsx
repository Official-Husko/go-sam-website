import { GITHUB_URL, LICENSE_URL, RELEASES_URL } from '../lib/constants'

export function Footer() {
  return (
    <footer class="site-footer">
      <div class="site-footer__divider" />
      <div class="site-footer__inner">
        <span class="site-footer__note">Unofficial, fan-made, not affiliated with Valve.</span>
        <div class="site-footer__links">
          <a href={GITHUB_URL} target="_blank" rel="noopener" aria-label="GitHub repository">
            <i class="fa-brands fa-github" aria-hidden="true" />
          </a>
          <a href={RELEASES_URL} target="_blank" rel="noopener" aria-label="Releases">
            <i class="fa-solid fa-tag" aria-hidden="true" />
          </a>
          <a href={LICENSE_URL} target="_blank" rel="noopener" aria-label="License">
            <i class="fa-solid fa-scale-balanced" aria-hidden="true" />
          </a>
          <span class="badge badge--outline">
            <i class="fa-solid fa-scale-balanced" aria-hidden="true" />
            zlib license
          </span>
        </div>
      </div>
    </footer>
  )
}
