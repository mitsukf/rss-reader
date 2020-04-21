const Router = require('express').Router

const router = Router()

router.get('/getRssInfo', (req, res) => {
  const offset = Number.isInteger(Number(req.query.offset))
    ? Number(req.query.offset)
    : 0
  const count = Number.isInteger(Number(req.query.count))
    ? Number(req.query.count)
    : 20

  if (offset >= 100) {
    res.json([])
    return
  }

  // 画面出力のためのmock返却
  const mockResponse = []
  for (let i = offset; i < offset + count; i++) {
    mockResponse.push({
      site: {
        name: `提供元サイト${i}`,
        link: 'https://www.yahoo.co.jp'
      },
      item: {
        title: `記事タイトル${i}`,
        link: 'https://www.google.co.jp',
        date: '2020/04/10 16:35'
      }
    })
  }

  res.json(mockResponse)
})

module.exports = router
