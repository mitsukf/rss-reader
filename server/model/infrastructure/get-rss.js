import Parser from 'rss-parser'
import moment from 'moment-timezone'

const REQUEST_TIMEOUT = 5000

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
        date: moment(item.date).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm')
      }
    })
  }
  return feeds
}

export async function getRss(url) {
  const feed = await new Parser({ timeout: REQUEST_TIMEOUT }).parseURL(url)
  return formatFeedResponse(feed)
}
