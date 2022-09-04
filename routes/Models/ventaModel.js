const mongoose = require('mongoose')
const schema = mongoose.Schema;

const ventaSchema = new schema({
    serie : String,
    productosVendidos : Array,
    subtotal : Number,
    fechaVenta : Date,
    impuesto : Number,
    totalVenta : Number,
    cliente : String,
    vendedor : String
})

const venta = mongoose.model("venta",ventaSchema)

module.exports = venta