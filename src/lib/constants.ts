export const GITHUB_REPO = 'Official-Husko/GO-SAM'
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`
export const RELEASES_URL = `${GITHUB_URL}/releases/latest`
export const LICENSE_URL = `${GITHUB_URL}/blob/master/LICENSE`
export const SOURCE_ZIP_URL = `${GITHUB_URL}/archive/refs/heads/master.zip`
export const GITHUB_API_LATEST_RELEASE_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`

/** Direct download link for a named asset attached to the latest release. */
export function latestReleaseAssetUrl(filename: string): string {
  return `${GITHUB_URL}/releases/latest/download/${filename}`
}
