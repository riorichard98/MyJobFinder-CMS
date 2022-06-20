const bcrypt = require('bcrypt')

const hashPassword = (str)=>{
    return bcrypt.hashSync(str,10)
}

const comparePassword = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}

module.exports = {
    hashPassword,
    comparePassword
}