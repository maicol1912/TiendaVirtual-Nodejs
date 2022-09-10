const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const cliente = require ('../Models/clienteModel.js');


router.get('/crear',(req,res)=>{
    res.render("pages/formularios/formulario_cliente")
})

router.post('/crear',async (req,res,next)=>{
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
        await clientedb.save()
        next(res.redirect("/cliente/listar"));
});
router.get("/listar",async(req,res)=>{
    const obtenerCliente = await cliente.find()
    res.render("pages/listar/listar_cliente",{clientes:obtenerCliente})
    
})
router.get("/editar/:id",async(req,res)=>{
    const id = req.params.id
    const clienteEditar = await cliente.find({_id : id})
    const clienteObjeto = clienteEditar[0];

   res.render("pages/update/update_cliente",{cliente :clienteObjeto})
   
})
router.post("/editar",async (req,res,next)=>{
    const body = req.body;
    const id = body.id
    const cedula = body.cedula;
    const nombre = body.nombre;
    const telefono = body.telefono;
    const ubicacion = {latitud:body.latitud,
                       longitud:body.longitud,
                       zoom:body.zoom}
    const totalComprado = body.totalComprado;
    const historialCompras = body.historialCompras;

    const clienteNuevo = {_id:id,
        cedula:cedula,
        nombre:nombre,
        telefono:telefono,
        ubicacion:ubicacion,
        totalComprado:totalComprado,
        historialCompras:historialCompras}
    
    await cliente.updateOne({_id:id},{$set:clienteNuevo})
    next(res.redirect("/cliente/listar"));
});
router.get("/eliminar/:id",async(req,res,next)=>{
    const id = req.params.id
    console.log(id)
    await cliente.findByIdAndDelete({_id : id});
   next(res.redirect("/cliente/listar"));
   
})

module.exports = router;


                 
