const JWT = require('jsonwebtoken')
const Error=require('http-errors')

module.exports ={
    signInAccess: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = ({ userId })
            const privateKey = process.env.PRIVATEKEY
            const options = {
                expiresIn: "1h",
                issuer: "google.com",
                audience: userId
            }
            JWT.sign(payload, privateKey,options, function(err, token) {
                if (err) {
                    reject(Error.InternalServerError(err))
                }
                resolve(token)
              });
        })
       
    },
    verifyToken: (req, res, next) => {
        const headers = req.headers['authorization']
        const bearerToken = headers.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.PRIVATEKEY,function (err, decoded) {
            if (err) {
                next(Error.InternalServerError(err))
            }
            req.book = decoded
            next()
          });
    }
}