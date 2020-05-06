const Router = require('express').Router

const getRssItems = require('./get-rss-items')
const validRssUrl = require('./valid-rss-url')

const router = Router()

router.use(getRssItems)
router.use(validRssUrl)

module.exports = router
