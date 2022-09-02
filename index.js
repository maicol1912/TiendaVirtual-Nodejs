const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
const path = require('path')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))
app.use(express.static("./public"))

app.listen(PORT,(req,res)=>{
    console.log("servidor Corriendo en el puerto: "+PORT)
})

app.get("/hola",(req,res)=>{
    res.render('pages/index')
})