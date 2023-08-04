const Router = require('express')
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