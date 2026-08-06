import { Steps } from '../components/Steps'
import { useReveal } from '../hooks/useReveal'

const USAGE_STEPS = [
  <>
    Run <code>./go-sam</code>. The Picker opens, listing games you own.
  </>,
  <>
    First run: open <strong>Settings</strong> and paste in your Steam Web API key.
  </>,
  <>
    Pick a game to open its <strong>Manager</strong> window.
  </>,
  "Inspect and edit that game's achievements and stats.",
]

export function Docs() {
  const usage = useReveal<HTMLElement>()
  const config = useReveal<HTMLElement>()
  const disclaimer = useReveal<HTMLElement>()
  const credits = useReveal<HTMLElement>()

  return (
    <>
      <section class="page-intro">
        <h1>Usage &amp; configuration</h1>
        <p>Just run the binary. This opens the Picker: a list of your owned games.</p>
      </section>

      <section class="section section--split" ref={usage.ref}>
        <Steps items={USAGE_STEPS} />
        <div class={`callout ${usage.class}`}>
          <div class="eyebrow">Good to know</div>
          <p>
            Selecting a game spawns a separate short-lived process scoped to that one game. You'll see it appear as
            its own window. This mirrors how the original SAM's SAM.Game.exe worked, and is intentional: it's how
            Steam's client library expects to be told which game is active.
          </p>
        </div>
      </section>

      <section class="section" ref={config.ref}>
        <div class={config.class}>
          <h3>Configuration</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Setting</th>
                  <th>Where it lives</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Steam Web API key</td>
                  <td>
                    In-app Settings screen, or <code>STEAM_API_KEY</code> env var, saved to{' '}
                    <code>~/.config/go-sam/config.json</code> (Linux) / <code>%AppData%\go-sam\config.json</code>{' '}
                    (Windows)
                  </td>
                </tr>
                <tr>
                  <td>Owned-games / app-list cache</td>
                  <td>
                    <code>~/.cache/go-sam/</code> (Linux) / <code>%LocalAppData%\go-sam\</code> (Windows)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="section" ref={disclaimer.ref}>
        <div class={`callout callout--warning ${disclaimer.class}`}>
          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          <div>
            <div class="eyebrow">Disclaimer</div>
            <p>
              This tool edits achievement and stat data your Steam account already has access to, exactly as the
              game itself would. It's meant for single-player, personal use: unlocking missed achievements, fixing
              corrupted stats, and similar. Some games track stats server-side for leaderboards or competitive
              features; editing those is between you and that game's own rules, and outside the scope of what this
              tool is for. Use it at your own risk.
            </p>
          </div>
        </div>
      </section>

      <section class="section" ref={credits.ref}>
        <div class={credits.class}>
          <h3>Credits &amp; license</h3>
          <p class="section-lead">
            GO-SAM is an independent Go reimplementation inspired by and ported from Steam Achievement Manager by
            Rick &quot;Gibbed&quot;, released under the zlib license. It is licensed under that same zlib license as
            an altered/derivative work. It is not the original software and is not officially associated with it or
            with Valve.
          </p>
          <div class="badge-row">
            <span class="badge badge--outline">
              <i class="fa-solid fa-scale-balanced" aria-hidden="true" />
              zlib license
            </span>
            <span class="badge">Unofficial &amp; unaffiliated</span>
          </div>
        </div>
      </section>
    </>
  )
}
