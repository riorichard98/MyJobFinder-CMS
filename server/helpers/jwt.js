require('dotenv').config()
const jwt = require('jsonwebtoken')

const makeToken = (payload)=>{
    return jwt.sign(payload,process.env.secretKey) //secretKey = `secret`
}

const readToken = (token)=>{
    return jwt.verify(token,process.env.secretKey) //secretKey = `secret`
}

module.exports = {
    makeToken,
    readToken
}