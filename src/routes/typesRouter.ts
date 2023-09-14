// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Router'.
const Router = require('express')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = new Router()
const typesController = require("../controllers/typesController")
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'checkRole'... Remove this comment to see the full error message
const checkRole = require("../middleware/checkRoleMiddleware")

router.post('/add', checkRole('ADMIN'), typesController.add) // create a new product type
router.post('/delete', checkRole('ADMIN'), typesController.delete) // delete a product type
router.get('/', typesController.getAll) // get all product types

module.exports = router