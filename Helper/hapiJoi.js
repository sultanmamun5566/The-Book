const joi = require('@hapi/joi')

const joiSch = new joi.object({
    name:joi.string(),
    email:joi.string(),
    password:joi.string(),
    title:joi.string(),
    pice:joi.string() ,
    price:joi.string() 
})

module.exports={joiSch}