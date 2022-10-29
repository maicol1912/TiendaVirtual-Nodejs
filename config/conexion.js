const mongoose = require('mongoose');
const NODE_ENV = process.env.NODE_ENV  || "development"

require('dotenv').config({
    path:`.env.${NODE_ENV}`
})
const user ="Maicol123"
const password ="UH7FXQ36nMO2vwV3"
const dbname = "tiendaPOS" 
const url =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vgcrq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
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