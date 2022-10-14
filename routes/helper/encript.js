const bcrypt = require('bcryptjs')

const encrypt = async(contraseña)=>{
    const hash = await bcrypt.hash(contraseña,10)
    return hash
} 

const compare = async (contraseña,hash)=>{
    return await bcrypt.compare(contraseña,hash)
}
module.exports = {encrypt,compare}