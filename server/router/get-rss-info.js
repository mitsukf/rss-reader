const Router = require('express').Router

const router = Router()

router.get('/getRssInfo', async (req, res) => {
  await new Promise((resolve) => {
    // 画面表示確認のためのディレイ
    setTimeout(() => {
      resolve()
    }, 500)
  })
  // 画面出力のためのmock返却
  const mockResponse = []
  for (let i = 1; i <= 5; i++) {
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
