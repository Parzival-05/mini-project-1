// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Router'.
const Router = require('express')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = new Router()

const productsRouter = require('./productsRouter')
const typesRouter = require('./typesRouter')
const usersRouter = require('./usersRouter')
const warehousesRouter = require('./warehousesRouter')

router.use('/products', productsRouter)
router.use('/types', typesRouter)
router.use('/users', usersRouter)
router.use('/warehouses', warehousesRouter)

module.exports = router