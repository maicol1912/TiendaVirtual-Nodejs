const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const venta = require('../Models/ventaModel');

router.get("/crear",(req,res)=>{
    res.render("pages/formularios/formulario_venta")
})

router.post("/crear",async (req,res)=>{
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
  
        res.redirect("/venta/listar");

    
});

router.get("/listar",async(req,res)=>{
    const obtenerVenta = await venta.find()
    res.render("pages/listar/listar_venta",{ventas:obtenerVenta})
    
})
router.get("/editar/:id",async(req,res)=>{
     const id = req.params.id
     const ventaEditar = await venta.find({_id : id})
     const ventaObjeto = ventaEditar[0];

    res.render("pages/update/update_venta",{venta :ventaObjeto})
    
})
router.post("/editar",async(req,res)=>{
        const body = req.body;
        const id = body.id;
        const serie = body.serie;
        const productosVendidos = body.productosVendidos;
        const subtotal = body.subtotal;
        const fechaVenta = body.fechaVenta;
        const impuesto = body.impuesto;
        const totalVenta = body.totalVenta;
        const cliente = body.cliente;
        const vendedor = body.vendedor;
        const ventaNueva = {_id:id,
                            serie:serie,
                            productosVendidos:productosVendidos,
                            subtotal:subtotal,
                            fechaVenta:fechaVenta,
                            impuesto:impuesto,
                            totalVenta:totalVenta,
                            cliente:cliente,
                            vendedor:vendedor};
    await venta.updateOne({_id:id},{$set:ventaNueva})
    res.redirect("/venta/listar");
    
})
router.get("/eliminar/:id",async(req,res)=>{
    const id = req.params.id
 
    await venta.findByIdAndDelete({_id : id})

    res.redirect("/venta/listar")
   
})
module.exports = router;