const JWT = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = JWT.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }
    catch (e) {
        console.log(e)
        res.status(401).json({ message: "Не авторизован" })
    }
}