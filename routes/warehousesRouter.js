const Router = require('express')
const router = new Router()
const warehousesController = require("../controllers/warehousesController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post('/create', checkRole('ADMIN'), warehousesController.create)
router.post('/delete', checkRole('ADMIN'), warehousesController.delete)
router.post('/add_product', checkRole('ADMIN'), warehousesController.addProduct.bind(warehousesController))
router.post('/delete_product', checkRole('ADMIN'), warehousesController.deleteProduct.bind(warehousesController))
router.get('/', warehousesController.getAll)
router.get('/getByID', warehousesController.getByID)

module.exports = router