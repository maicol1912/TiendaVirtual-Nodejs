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
        const cedula = body.cedula;
        const nombre = body.nombre;
        const telefono = body.telefono;
        const ubicacion = Object(body.ubicacion);
        const totalComprado = body.totalComprado;
        const historialCompras = Array(body.historialCompras);
        const clientedb = new cliente({cedula:cedula,
                                       nombre:nombre,
                                       telefono:telefono,
                                       ubicacion:ubicacion,
                                       totalComprado:totalComprado,
                                       historialCompras:historialCompras
                                    });
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
        const referencia = body.referencia;
        const nombre = body.nombre;
        const descripcion = body.descripcion;
        const precio = body.precio;
        const stock = body.stock;
        const productodb = new producto({referencia: referencia,
                                        nombre:nombre,
                                        descripcion:descripcion,
                                        precio:precio,
                                        stock:stock
                                    });
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
        const nombre = body.nombre;
        const cedula = body.cedula;
        const ventasHechas = Array(body.ventasHechas);
        const vendedordb = new vendedor({nombre:nombre,
                                         cedula:cedula,
                                         ventasHechas:ventasHechas});
        await vendedordb.save()
        console.log(nombre);
        res.redirect("/crear_vendedor");
});

//PARA LA COLECCION VENTAS
router.get("/crear_venta",(req,res)=>{
    res.render("pages/formularios/formulario_venta")
})

router.post("/crear_venta",async (req,res)=>{
        const body = req.body;
        const serie = body.serie;
        const productosVendidos = body.productosVendidos;
        const subtotal = body.subtotal;
        const fechaVenta = Date(body.fechaVenta);
        const impuesto = body.impuesto;
        const totalVenta = body.totalVenta;
        const cliente = body.cliente;
        const vendedor = body.vendedor;

        const ventadb = new venta({
                                serie : serie,
                                productosVendidos : productosVendidos,
                                subtotal : subtotal,
                                fechaVenta : fechaVenta,
                                impuesto : impuesto,
                                totalVenta : totalVenta,
                                cliente : cliente,
                                vendedor : vendedor
        });
        await ventadb.save()
        console.log(venta);
        res.redirect("/crear_venta");

    
});
module.exports = router;
                 
