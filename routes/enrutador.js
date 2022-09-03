const express  = require('express');
const router = express.Router();
const conexionDb = require('../config/conexion');


router.get('/inicio',(req,res)=>{
    res.send("SOY UN INICIO ENRUTADO");
})

router.get('/conectar',(req,res)=>{
    
    const db = conexionDb.mongoose;
    const col=db.Collection('tiendaPOS')
    col.fin
})

module.exports = router;
                 
