// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'JWT'.
const JWT = require('jsonwebtoken')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'User'.
const { User } = require('../models/index')

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = JWT.verify(token, process.env.SECRET_KEY)
        req.user = await User.findOne({ where: { email: decoded.email } })
        next()
    }
    catch (e) {
        res.status(401).json({ message: "Не авторизован" })
    }
}