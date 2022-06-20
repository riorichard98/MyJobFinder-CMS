const { comparePassword } = require('../helpers/bcrypt.js')
const { makeToken } = require('../helpers/jwt.js')
const { User } = require('../models/index.js')
require('dotenv').config()

class UserController {
    static async afterLogin(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Email or password is required"
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw ({
                    type: "known",
                    code: 401,
                    message: "Invalid password or email"
                })
            }
            if (!comparePassword(password, user.password)) {
                throw ({
                    type: "known",
                    code: 401,
                    message: "Invalid password or email"
                })
            }
            const payLoad = { id: user.id }
            const token = makeToken(payLoad)
            // console.log(token);
            res.status(200).json({
                token,
                UserId:user.id

            })
        } catch (error) {
            next(error)
        }
    }

    static async afterRegister(req, res, next) {
        try {
            if (!req.body.email) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Email required"
                })
            }
            if (!req.body.password) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Password required"
                })
            }
            const { username, email, password, phoneNumber, address, role } = req.body
            const val1 = await User.findOne({ where: { username } })
            const val2 = await User.findOne({ where: { email } })

            if (val1 || val2) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Username or email has been taken"
                })
            }

            await User.create({ username, email, password, phoneNumber, address, role })
            res.status(201).json({
                message: 'New admin has been registered'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { UserController }