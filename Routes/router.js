const express = require('express')
const { Register, Login, Getting } = require('../Controller/controllerBooks')
const {verifyToken}=require('../Token/token')
const router = express.Router();


router.post('/register',Register)
router.post('/login',Login)
router.get('/get',verifyToken,Getting)


module.exports=router


