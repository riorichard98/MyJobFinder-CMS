const { readToken } = require("../helpers/jwt.js");
const {User} = require('../models/index.js')
 
const authN = async (req,res,next)=>{
    try {
        if(!req.headers.token){
            throw({
                type:"known",
                code:401,
                message:"Authentication error"
            })
        }
        const {token} = req.headers
        const payload = readToken(token) 
        const user = await User.findByPk(payload.id)
        if(!user){
            // throw new Error('user not found')
            throw({
                type:"known",
                code:401,
                message:"Authentication error"
            })
        }
        req.loggedIn = {
            authorId:user.id,
            role:user.role,
            updatedBy:user.username
        }
        next()
    } catch (error) {
        next(error)
    }
}

// const customerAuthn = async (req,res,next)=>{
//     try {
//         if(!req.headers.token){
//             throw({
//                 type:"known",
//                 code:401,
//                 message:"Authentication error"
//             })
//         }
//         const {token} = req.headers
//         const payload = readToken(token) 
//         const customer = await Customer.findByPk(payload.id)
//         if(!customer){
//             throw({
//                 type:"known",
//                 code:401,
//                 message:"Authentication error"
//             })
//         }
//         req.loggedIn = {
//             id:customer.id
//         }
//         next()
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = {authN}