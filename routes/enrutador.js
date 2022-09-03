const express  = require('express');
const router = express.Router();
const conexionDb = require('../config/conexion');


router.get('/inicio',(req,res)=>{
    res.send("SOY UN INICIO ENRUTADO");
})

router.get('/conectar',(req,res)=>{
    const coleccion = "tiendaPOS"  
    const db = conexionDb.mongoose;
    db.Collection(coleccion)
})

module.exports = router;
                 
