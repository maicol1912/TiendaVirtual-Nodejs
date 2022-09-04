const mongoose = require('mongoose')
const schema = mongoose.Schema;

const productoSchema = new schema({
    referencia :String,
    nombre : String,
    descripcion : String,
    precio : Number,
    stock : Number
})

const producto = mongoose.model("producto",productoSchema)

module.exports = producto