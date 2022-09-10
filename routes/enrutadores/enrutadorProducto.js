const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const producto = require('../Models/productoModel');

router.get("/crear",(req,res)=>{
    res.render("pages/formularios/formulario_producto")
})

router.post("/crear",async (req,res,next)=>{
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
        next(res.redirect("producto/listar"));
   
});

router.get("/listar",async(req,res)=>{
    const obtenerProducto = await producto.find()
    res.render("pages/listar/listar_producto",{productos:obtenerProducto})
    
})
router.get("/editar/:id",async(req,res)=>{
    const id = req.params.id
    const productoEditar = await producto.find({_id : id})
    const productoObjeto = productoEditar[0];
   res.render("pages/update/update_producto",{producto :productoObjeto})
   
})
router.post("/editar",async (req,res,next)=>{
    const body = req.body;
    const id = body.id;
    const referencia = body.referencia;
    const nombre = body.nombre;
    const descripcion = body.descripcion;
    const precio = body.precio;
    const stock = body.stock;
    const productoNuevo = { _id:id,
                            referencia: referencia,
                            nombre:nombre,
                            descripcion:descripcion,
                            precio:precio,
                            stock:stock
                                };
    await producto.updateOne({_id:id},{$set:productoNuevo})
    next(res.redirect("/producto/listar"));

});
router.get("/eliminar/:id",async(req,res,next)=>{
    const id = req.params.id

    await producto.findByIdAndDelete({_id : id})

   next(res.redirect("/producto/listar"));
   
})

module.exports = router;