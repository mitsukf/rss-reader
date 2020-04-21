import Parser from 'rss-parser'
import moment from 'moment'

function fetchData(url) {
  const parser = new Parser()
  return parser.parseURL(url)
}

function formatFeedResponse(data) {
  const feeds = []
  for (const item of data.items) {
    feeds.push({
      site: {
        name: data.title,
        link: data.link
      },
      item: {
        title: item.title,
        link: item.link,
        date: moment(item.date).format('YYYY/MM/DD HH:mm')
      }
    })
  }
  return feeds
}

export function getRssItemsModel(xmlList) {
  const feeds = []
  return new Promise((resolve) => {
    Promise.all(xmlList.map(fetchData))
      .then((responses) => {
        // レスポンスをパース
        for (const response of responses) {
          feeds.push(...formatFeedResponse(response))
        }

        // 日付順にソート
        feeds.sort((a, b) => {
          if (a.item.date > b.item.date) return -1
          if (a.item.date < b.item.date) return 1
          return 0
        })

        // データ返却
        resolve(feeds)
      })
  })
}
