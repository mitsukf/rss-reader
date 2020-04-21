/* eslint-disable no-console */
import { getRssItemsModel } from '../model/get-rss-items-model'

export async function getRssItemsController(req, res) {
  const offset = Number.isInteger(Number(req.query.offset)) ? Number(req.query.offset) : 0
  const count = Number.isInteger(Number(req.query.count)) ? Number(req.query.count) : 20
  const xmlList = [
    'http://feeds.cnn.co.jp/rss/cnn/cnn.rdf',
    'http://feeds.japan.cnet.com/rss/cnet/all.rdf'
  ]

  // rssアイテムを取得
  const rssItems = await getRssItemsModel(xmlList)

  // rssアイテムを切り出し
  if (offset > rssItems.length) {
    return []
  }
  return rssItems.slice(offset, offset + count)
}
