const express = require('express')
const routes=require('./router')

const router = express.Router()

router.use('/book',routes)

module.exports=router