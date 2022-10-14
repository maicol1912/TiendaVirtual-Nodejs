const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const usuariol = require ('../Models/usuarioModel.js');
const encript = require ('../helper/encript.js');

router.get('/crear',(req,res)=>{
    res.render("pages/formularios/formulario_usuario")
})

router.post('/crear',async (req,res,next)=>{
        const body = req.body;
        const nombre = body.nombre;
        const usuario = body.usuario;
        const correo = body.correo;
        const contraseña = body.contraseña;
        const contraseñaHash = await encript.encrypt(contraseña) 

        const usuariodb = new usuariol({nombre:nombre,
                                       usuario:usuario,
                                       correo:correo,
                                       contraseña:contraseñaHash
                                    });
        await usuariodb.save()
        next(res.redirect("/usuario/listar"));
});
router.get("/listar",async(req,res)=>{
    const obtenerUsuario = await usuariol.find()
    res.render("pages/listar/listar_usuario",{usuarios:obtenerUsuario})
    
})
router.get("/editar/:id",async(req,res)=>{
    const id = req.params.id
    const usuarioEditar = await usuariol.find({_id : id})
    const usuarioObjeto = usuarioEditar[0];

   res.render("pages/update/update_usuario",{usuario :usuarioObjeto})
   
})
router.post("/editar",async (req,res,next)=>{
    const body = req.body;
    const id = body.id
    const nombre = body.nombre;
    const usuario = body.usuario;
    const correo = body.correo;
    const contraseña = body.contraseña;

    const usuarioNuevo = {_id:id,
        nombre:nombre,
        usuario:usuario,
        correo:correo,
        contraseña:contraseña    
    }
    
    await usuariol.updateOne({_id:id},{$set:usuarioNuevo})
    next(res.redirect("/usuario/listar"));
});
router.get("/eliminar/:id",async(req,res,next)=>{
    const id = req.params.id
    console.log(id)
    await usuariol.findByIdAndDelete({_id : id});
   next(res.redirect("/usuario/listar"));
   
})

module.exports = router;


                 
