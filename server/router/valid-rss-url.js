import { Router } from 'express'
import { validRssUrlController } from '../controller/valid-rss-url-controller'

const router = Router()

router.get('/validRssUrl', async (req, res) => {
  const judge = await validRssUrlController(req, res)
  res.json({ validate: judge })
})

module.exports = router
