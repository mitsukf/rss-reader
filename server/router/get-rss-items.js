import { Router } from 'express'
import { getRssItemsController } from '../controller/get-rss-items-controller'

const router = Router()

router.get('/getRssItems', async (req, res) => {
  const response = await getRssItemsController(req, res)
  res.json(response)
})

module.exports = router
