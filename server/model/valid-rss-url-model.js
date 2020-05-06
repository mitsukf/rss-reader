import { getRss } from './infrastructure/get-rss'

export async function validRssUrlModel(url) {
  try {
    await getRss(url)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message)
    return false
  }

  return true
}
