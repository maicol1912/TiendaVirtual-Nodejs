const mongoose = require('mongoose');

const user ="Maicol123"
const password ="UH7FXQ36nMO2vwV3"
const dbname = "tiendaPOS" 
const url =`mongodb+srv://${user}:${password}@cluster0.vgcrq.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const conexionParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(url,conexionParams)
    .then(()=>{
        console.log("Conectado a la base de datos")
    })
    .catch((err)=>{
        console.error(`Error de conexion ${err}`)
    })

module.exports = {
    mongoose
}