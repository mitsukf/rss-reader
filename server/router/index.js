const Router = require('express').Router

const getRssItems = require('./get-rss-items')
const getRssInfo = require('./get-rss-info')

const router = Router()

router.use(getRssItems)
router.use(getRssInfo)

module.exports = router
