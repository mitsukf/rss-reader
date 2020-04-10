const Router = require('express').Router

const getRssInfo = require('./get-rss-info')

const router = Router()

router.use(getRssInfo)

module.exports = router
