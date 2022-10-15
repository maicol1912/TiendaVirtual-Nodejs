const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const usuarioModel = require('../Models/usuarioModel');
const encript = require ('../helper/encript.js');

router.get("/registrar",(req,res)=>{
    res.render("pages/usuario/formulario_usuario")
})

router.get("/iniciar-sesion",async(req,res)=>{
    res.render("pages/ingreso/inicioSesion")
})

router.post("/iniciar-sesion",async(req,res)=>{
    const body = req.body;
    const usuario = body.usuario
    const contraseña = body.contraseña
    const user = await usuarioModel.findOne({usuario:usuario})
    if(!user){
        res.render("pages/ingreso/error")
    }
    const checkPassword  = await encript.compare(contraseña,user.contraseña)

    if(checkPassword){
        res.cookie("usuario",usuario);
        res.cookie("rol",user.rol)
        res.render("pages/ingreso/logueoUsuario",{
                                                  "usuario":usuario,
                                                  "rol": user.rol
                                                }
                                                )
    }
    if(!checkPassword){
        res.render("pages/ingreso/error")
    }
})


module.exports = router;

