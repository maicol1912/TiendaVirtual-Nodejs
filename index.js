const express = require('express')
const app = express()
const enrutador = require('router')
const PORT = process.env.PORT || 9000
const path = require('path')
const enrutamiento = require("./routes/enrutador");

app.use("/",enrutamiento)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))
app.use(express.static("./public"))


app.get("/",(req,res,next)=>{
    res.send("hola soy el index")
    next(enrutamiento);
})

app.listen(PORT,()=>{
    console.log("servidor Corriendo en el puerto: "+PORT)
})
