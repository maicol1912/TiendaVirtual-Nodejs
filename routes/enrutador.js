const express  = require('express');
const router = express.Router();
const conexionDb = require('../config/conexion');
const vendedor = require('./Models/vendedorModel');
const cliente = require ('./Models/clienteModel.js');
const producto = require('./Models/productoModel');
const venta = require('./Models/ventaModel');
const { findByIdAndUpdate } = require('./Models/clienteModel');





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
        const ubicacion = {latitud:body.latitud,
                           longitud:body.longitud,
                           zoom: body.zoom};
        const totalComprado = parseInt(body.totalComprado);
        const historialCompras = Array(body.historialCompras);
        const clientedb = new cliente({cedula:cedula,
                                       nombre:nombre,
                                       telefono:telefono,
                                       ubicacion:ubicacion,
                                       totalComprado:totalComprado,
                                       historialCompras:historialCompras
                                    });
        console.log(clientedb.ubicacion)
        await clientedb.save()
        res.redirect("/listar_cliente");
});
router.get("/listar_cliente",async(req,res)=>{
    const obtenerCliente = await cliente.find()
    res.render("pages/listar/listar_cliente",{clientes:obtenerCliente})
    
})
router.get("/editar_cliente/:id",async(req,res)=>{
    const id = req.params.id
    const clienteEditar = await cliente.find({_id : id})
    const clienteObjeto = clienteEditar[0];
    console.log(clienteObjeto)
   res.render("pages/update/update_cliente",{cliente :clienteObjeto})
   
})
router.post("/editar_cliente",async (req,res)=>{
    console.log(req.body)
    const body = req.body;
    const id = req.params.id;
    const cedula = body.cedula;
    const nombre = body.nombre;
    const telefono = body.telefono;
    const ubicacion = body.ubicacion;
    const totalComprado = body.totalComprado;
    const historialCompras = body.historialCompras;
    await cliente.findByIdAndUpdate(id,{cedula:cedula,
                                  nombre:nombre,
                                  telefono:telefono,
                                  ubicacion:ubicacion,
                                  totalComprado:totalComprado,
                                  historialCompras:historialCompras})
    res.redirect("/listar_cliente");
});
router.get("/eliminar_cliente/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    await cliente.findByIdAndDelete({_id : id})
    console.log("eliminado con exito");
   res.redirect("/listar_cliente")
   
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
        const precio = parseInt(body.precio);
        const stock = parseInt(body.stock);
        const productodb = new producto({referencia: referencia,
                                        nombre:nombre,
                                        descripcion:descripcion,
                                        precio:precio,
                                        stock:stock
                                    });
        await productodb.save()
        console.log(productodb);
        res.redirect("/listar_producto");
   
});

router.get("/listar_producto",async(req,res)=>{
    const obtenerProducto = await producto.find()
    res.render("pages/listar/listar_producto",{productos:obtenerProducto})
    
})
router.get("/editar_producto/:id",async(req,res)=>{
    const id = req.params.id
    const productoEditar = await producto.find({_id : id})
    const productoObjeto = productoEditar[0];
   res.render("pages/update/update_producto",{producto :productoObjeto})
   
})
router.post("/editar_producto",async (req,res)=>{
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
    res.redirect("/listar_producto");

});
router.get("/eliminar_producto/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    await producto.findByIdAndDelete({_id : id})
    console.log("eliminado con exito");
   res.redirect("/listar_producto")
   
})

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
        res.redirect("/listar_vendedor");
});
router.get("/listar_vendedor",async(req,res)=>{
    const obtenerVendedor = await vendedor.find()
    res.render("pages/listar/listar_vendedor",{vendedores:obtenerVendedor})
    
})
router.get("/editar_vendedor/:id",async(req,res)=>{
    const id = req.params.id
    const vendedorEditar = await vendedor.find({_id : id})
    const vendedorObjeto = vendedorEditar[0];
    console.log(vendedorObjeto)
   res.render("pages/update/update_vendedor",{vendedor :vendedorObjeto})
   
})
router.post("/editar_vendedor",async (req,res)=>{
    const body = req.body;
    const nombre = body.nombre;
    const cedula = body.cedula;
    const ventasHechas = body.ventasHechas;
    const vendedordb = new vendedor({nombre:nombre,
                                     cedula:cedula,
                                     ventasHechas:ventasHechas});
    await vendedordb.save()
    console.log(nombre);
    res.redirect("/listar_vendedor");
});
router.get("/eliminar_vendedor/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    await vendedor.findByIdAndDelete({_id : id})
    console.log("eliminado con exito");
   res.redirect("/listar_vendedor")
   
})
//PARA LA COLECCION VENTAS
router.get("/crear_venta",(req,res)=>{
    res.render("pages/formularios/formulario_venta")
})

router.post("/crear_venta",async (req,res)=>{
        const body = req.body;
        const serie = body.serie;
        const productosVendidos = body.productosVendidos;
        const subtotal = parseInt(body.subtotal);
        const fechaVenta = Date.parse(body.fechaVenta);
        const impuesto = parseInt(body.impuesto);
        const totalVenta = parseInt(body.totalVenta);
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
        res.redirect("/listar_venta");

    
});

router.get("/listar_venta",async(req,res)=>{
    const obtenerVenta = await venta.find()
    res.render("pages/listar/listar_venta",{ventas:obtenerVenta})
    
})
router.get("/editar_venta/:id",async(req,res)=>{
     const id = req.params.id
     const ventaEditar = await venta.find({_id : id})
     const ventaObjeto = ventaEditar[0];
     console.log(ventaObjeto)
    res.render("pages/update/update_venta",{venta :ventaObjeto})
    
})
router.post("/editar_venta",async(req,res)=>{
        const body = req.body;
        const id = req.params.id;
        const serie = body.serie;
        const productosVendidos = body.productosVendidos;
        const subtotal = body.subtotal;
        const fechaVenta = Date.parse(body.fechaVenta);
        const impuesto = body.impuesto;
        const totalVenta = body.totalVenta;
        const cliente = body.cliente;
        const vendedor = body.vendedor;

        await ventadb.save()
        console.log(venta);
        res.redirect("/listar_venta");
    
})
router.get("/eliminar_venta/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    await venta.findByIdAndDelete({_id : id})
    console.log("eliminado con exito");
   res.redirect("/listar_venta")
   
})
module.exports = router;
                 
