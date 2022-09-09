const express  = require('express');
const router = express.Router();
const conexionDb = require('../../config/conexion');
const cliente = require('../Models/clienteModel');


router.get("/registrar",(req,res)=>{
    res.render("pages/ingreso/registro")
})

router.get("/iniciar-sesion",async(req,res)=>{
    res.render("pages/ingreso/inicioSesion")
})

router.post("/iniciar-sesion",async(req,res)=>{
    const body = req.body;
    const cedula = body.cedula
    const nombre = body.nombre
    clienteInicio = cliente.find({cedula:cedula})
    console.log(clienteInicio.cedula)
    res.send("con exito")
})


module.exports = router;

