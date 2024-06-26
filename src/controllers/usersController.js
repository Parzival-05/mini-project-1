const { User } = require('../models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const generateJWT = (user, email, role) => {
    return JWT.sign(
        { id: user.id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' })
}

class UsersController {
    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, password: hashPassword, role })
            const token = generateJWT(user.id, email, role)
            return res.json(token)
        }
        catch (e) { next(ApiError.badRequest(e.message)) }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль'))
            }
            const token = generateJWT(user.id, email, user.role)
            return res.json(token)
        }
        catch (e) { next(ApiError.badRequest(e.message)) }
    }

    async check({ user }, res) {
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({ token })
    }
}

module.exports = new UsersController()