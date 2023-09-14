// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Router'.
const Router = require('express')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = new Router()
const usersController = require("../controllers/usersController")
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.get('/auth', authMiddleware, usersController.check) // проверка, авторизован ли пользователь

module.exports = router