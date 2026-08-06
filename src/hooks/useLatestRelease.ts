import { useEffect, useState } from 'preact/hooks'
import { GITHUB_API_LATEST_RELEASE_URL } from '../lib/constants'

/** The latest release tag from GitHub, or null while loading / if it can't be fetched. */
export function useLatestRelease(): string | null {
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(GITHUB_API_LATEST_RELEASE_URL, { headers: { Accept: 'application/vnd.github+json' } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { tag_name?: string } | null) => {
        if (!cancelled && data?.tag_name) setVersion(data.tag_name)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  return version
}
