const express = require('express')
const app = express()
const enrutador = require('router')
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 9000
const path = require('path')
const enrutadorProducto = require("./routes/enrutadores/enrutadorProducto");
const enrutadorVendedor = require("./routes/enrutadores/enrutadorVendedor");
const enrutadorVenta = require("./routes/enrutadores/enrutadorVenta");
const enrutadorCliente = require("./routes/enrutadores/enrutadorCliente");
const enrutadorIngreso = require("./routes/enrutadores/enrutadorIngreso");
const enrutadorCarrito = require("./routes/enrutadores/enrutadorCarrito");
const enrutadorUsuario = require("./routes/enrutadores/enrutadorUsuario");


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/cliente",enrutadorCliente);
app.use("/producto",enrutadorProducto);
app.use("/vendedor",enrutadorVendedor);
app.use("/venta",enrutadorVenta)
app.use("/ingreso",enrutadorIngreso)
app.use("/carrito",enrutadorCarrito)
app.use("/usuario",enrutadorUsuario)

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))
app.use(express.static("./public"))


app.get("/",(req,res,next)=>{
    res.render("index.ejs")
})
app.get("/cliente",enrutadorCliente);
app.get("/producto",enrutadorProducto);
app.get("/vendedor",enrutadorVendedor);
app.get("/venta",enrutadorVenta);
app.get("/ingreso",enrutadorIngreso)
app.get("/carrito",enrutadorCarrito)
app.get("/usuario",enrutadorUsuario)

app.listen(PORT,()=>{
    console.log("servidor Corriendo en el puerto: "+PORT)
})
