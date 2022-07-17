const Book = require('../SchBooks/SchBook')
const { joiSch } = require('../Helper/hapiJoi')
const Error=require('http-errors')
const {signInAccess}=require('../Token/token')
exports.Register = async (req, res,next) => {
    try {
       const data=await joiSch.validateAsync(req.body)
        const mail = await Book.findOne({ email: data.email })
        if(mail) throw Error.NotFound('email already exit')
        const result = await Book(data)
       const saveBook=  await result.save()
        const signToken=await signInAccess(saveBook.id)
        res.send(signToken)
    } catch (err) {
        next(err)
    }
}

exports.Login = async (req, res,next) => {
    try {
        const data = await joiSch.validateAsync(req.body)
        const mailTest = await Book.findOne({ email: data.email })
        // console.log(mailTest.email)
        if (!mailTest) throw Error.NotFound('you are not register')
        const PassTest = await mailTest.isValidPass(data.password)
        if (!PassTest) throw Error.NotFound('password is notfound')
        const accessToken = await signInAccess(mailTest.id)
        res.send(accessToken)
    } catch (err) {
        next(err)
    }
}

exports.Getting = async (req, res,next) => {
    try {
        const data = req.book.userId;
        const blog = await Book.find({ _id: data })
        res.send(blog)
        
    } catch (err) {
        next(err)
    }
}