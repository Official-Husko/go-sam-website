import { useEffect, useState } from 'preact/hooks'

export type OS = 'windows' | 'linux' | null

export function useOS(): OS {
  const [os, setOS] = useState<OS>(null)

  useEffect(() => {
    const ua = navigator.userAgent || ''
    if (ua.includes('Win')) setOS('windows')
    else if (ua.includes('Linux') && !ua.includes('Android')) setOS('linux')
  }, [])

  return os
}
