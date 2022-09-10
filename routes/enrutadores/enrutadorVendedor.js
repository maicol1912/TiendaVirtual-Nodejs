const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const vendedor = require('../Models/vendedorModel');

router.get("/crear",(req,res)=>{
    res.render("pages/formularios/formulario_vendedor")
})

router.post("/crear",async (req,res,next)=>{
        const body = req.body;
        const nombre = body.nombre;
        const cedula = body.cedula;
        const ventasHechas = Array(body.ventasHechas);
        const vendedordb = new vendedor({nombre:nombre,
                                         cedula:cedula,
                                         ventasHechas:ventasHechas});
        await vendedordb.save()

        next(res.redirect("/vendedor/listar"));
});
router.get("/listar",async(req,res)=>{
    const obtenerVendedor = await vendedor.find()
    res.render("pages/listar/listar_vendedor",{vendedores:obtenerVendedor})
    
})
router.get("/editar/:id",async(req,res)=>{
    const id = req.params.id
    const vendedorEditar = await vendedor.find({_id : id})
    const vendedorObjeto = vendedorEditar[0];

   res.render("pages/update/update_vendedor",{vendedor :vendedorObjeto})
   
})
router.post("/editar",async (req,res,next)=>{
    const body = req.body;
    const id = body.id;
    const nombre = body.nombre;
    const cedula = body.cedula;
    const ventasHechas = body.ventasHechas;
    const vendedorNuevo ={_id:id,
                                     nombre:nombre,
                                     cedula:cedula,
                                     ventasHechas:ventasHechas};
    await vendedor.updateOne({_id:id},{$set:vendedorNuevo})
    next(res.redirect("/vendedor/listar"));
});
router.get("/eliminar/:id",async(req,res,next)=>{
    const id = req.params.id
 
    await vendedor.findByIdAndDelete({_id : id})

   next(res.redirect("/vendedor/listar"));
   
})

module.exports = router;