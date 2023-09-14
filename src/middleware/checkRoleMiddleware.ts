// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'JWT'.
const JWT = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" })
            }
            const decoded = JWT.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Нет доступа" })
            }
            req.user = decoded
            next()
        }
        catch (e) {
            console.log(e)
            res.status(401).json({ message: "Не авторизован" })
        }
    }
}