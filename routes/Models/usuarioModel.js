const mongoose = require('mongoose')
const schema = mongoose.Schema;

const usuarioSchema = new schema({
    nombre:String,
    usuario :String,
    correo:String,
    rol:String,
    contraseña : String,
})

const usuario = mongoose.model("usuario",usuarioSchema)

module.exports = usuario