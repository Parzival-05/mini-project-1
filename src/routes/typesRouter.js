const Router = require('express')
const router = new Router()
const typesController = require("../controllers/typesController")
const checkRole = require("../middleware/checkRoleMiddleware")

router.post('/add', checkRole('ADMIN'), typesController.add) // create a new product type
router.post('/delete', checkRole('ADMIN'), typesController.delete) // delete a product type
router.get('/', typesController.getAll) // get all product types

module.exports = router