const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const error=require('http-errors')
const book = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
   password: {
        type: String,
    },
    title: {
        type: String,
    },
    pice: {
        type: String,
    },
   price: {
        type: String,
    },
    
})

book.pre('save', async function (next) {
    const salt =await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(this.password, salt)
    this.password = hashPass
    next()
    
})

book.methods.isValidPass = async function (password) {
    try {
        return bcrypt.compare(password,this.password)
    } catch (err) {
        return error(err)
    }
}

module.exports=mongoose.model('book',book)