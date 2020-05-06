import { validRssUrlModel } from '../model/valid-rss-url-model'

export async function validRssUrlController(req, res) {
  const url = typeof req.query.url !== 'undefined' ? req.query.url : ''

  if (url.match('^http(s)?://') === null) {
    // URL形式じゃない場合はfalse
    return false
  }

  return await validRssUrlModel(url)
}
