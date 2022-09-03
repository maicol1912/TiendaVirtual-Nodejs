const mongoose = require('mongoose');
const url =`mongodb+srv://Maicol123:UH7FXQ36nMO2vwV3@cluster0.vgcrq.mongodb.net/?retryWrites=true&w=majority`;
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