const express  = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')



router.get("/envio-mensaje",(req,res)=>{
    res.send("hola")
})

module.exports = router;
