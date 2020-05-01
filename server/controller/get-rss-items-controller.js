import { getRssItemsModel } from '../model/get-rss-items-model'

export async function getRssItemsController(req, res) {
  const offset = Number.isInteger(Number(req.query.offset))
    ? Number(req.query.offset)
    : 0
  const count = Number.isInteger(Number(req.query.count))
    ? Number(req.query.count)
    : 20
  const urlList = []
  if (!urlList || Array.isArray(req.query.urlList)) {
    urlList.push(...req.query.urlList)
  }

  // rssアイテムを取得
  const rssItems = await getRssItemsModel(urlList)

  // rssアイテムを切り出し
  if (offset > rssItems.length) {
    return []
  }
  return rssItems.slice(offset, offset + count)
}
