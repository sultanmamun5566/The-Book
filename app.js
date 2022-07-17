const express = require('express');
const mongoose = require('mongoose')
require('dotenv/config')
app = express();
const Router=require('./Routes/indexRoute')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(Router)

mongoose.connect(process.env.BD_BOOK, () => {
    console.log('database')
})

app.listen(5000, () => {
    console.log('port connect')
})