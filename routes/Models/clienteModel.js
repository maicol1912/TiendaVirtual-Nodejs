const mongoose = require('mongoose')
const schema = mongoose.Schema;

const clienteSchema = new schema({
    cedula :String,
    nombre : String,
    telefono: String,
    ubicacion : Object,
    totalComprado : Number,
    historialCompras : Array
})

const cliente = mongoose.model("cliente",clienteSchema)

module.exports = cliente