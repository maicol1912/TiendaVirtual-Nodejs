const mongoose = require('mongoose')
const schema = mongoose.Schema;

const vendedorSchema = new schema({
    nombre : String,
    cedula : String,
    ventasHechas : Array
})

const vendedor = mongoose.model("vendedor",vendedorSchema)

module.exports = vendedor