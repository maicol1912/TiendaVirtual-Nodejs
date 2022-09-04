const express  = require('express');
const router = express.Router();
const conexionDb = require('../config/conexion');
const vendedor = require('./Models/vendedorModel');
const cliente = require ('./Models/clienteModel.js');
const producto = require('./Models/productoModel');
const venta = require('./Models/ventaModel');



router.get('/inicio',(req,res)=>{
    res.send("SOY UN INICIO ENRUTADO");
})


//PARA LA COLECCION CLIENTES
router.get("/crear_cliente",(req,res)=>{
    res.render("pages/formularios/formulario_cliente")
})

router.post("/crear_cliente",async (req,res)=>{
        const body = req.body;
        const clientedb = new cliente(body);
        await clientedb.save()
        console.log(clientedb);
        res.redirect("/crear_cliente");
});
router.get("/listar_cliente",(req,res)=>{
    res.render("pages/formularios/formulario_cliente")
})

//PARA LA COLECCION PRODUCTOS
router.get("/crear_producto",(req,res)=>{
    res.render("pages/formularios/formulario_producto")
})

router.post("/crear_producto",async (req,res)=>{
        const body = req.body;
        const productodb = new producto(body);
        await productodb.save()
        console.log(productodb);
        res.redirect("/crear_producto");
});

//PARA LA COLECCION VENDEDORES
router.get("/crear_vendedor",(req,res)=>{
    res.render("pages/formularios/formulario_vendedor")
})

router.post("/crear_vendedor",async (req,res)=>{
        const body = req.body;
        const vendedordb = new vendedor(body);
        await vendedordb.save()
        console.log(vendedordb);
        res.redirect("/crear_vendedor");
});

//PARA LA COLECCION VENTAS
router.get("/crear_venta",(req,res)=>{
    res.render("pages/formularios/formulario_venta")
})

router.post("/crear_venta",async (req,res)=>{
        const body = req.body;
        const ventadb = new venta(body);
        await ventadb.save()
        console.log(venta);
        res.redirect("/crear_venta");
});
module.exports = router;
                 
