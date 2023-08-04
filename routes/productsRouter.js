const Router = require('express')
const router = new Router()
const productsController = require("../controllers/productsController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post('/add', checkRole('ADMIN'), productsController.add) // create a new product
router.post('/delete', checkRole('ADMIN'), productsController.delete) // edit product's info
router.post('/edit', checkRole('ADMIN'), productsController.add) // edit product's info
router.get('/getByType', productsController.getByType) // get lists of products with filtration by typeId
router.get('/getById', productsController.getById) // get info about product by its productId 
router.get('/getByVendorCode', productsController.getByVendorCode) // get info about product by its vendor code

module.exports = router