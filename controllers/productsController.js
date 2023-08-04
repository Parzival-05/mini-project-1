const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ProductsController {
    // eslint-disable-next-line no-unused-vars
    async buy(req, res, next) {

    }

    async add(req, res, next) {
        try { // in case of double add of unique column, method will return "Validation error" 
            const { vendorCode, name, price, typeId } = req.body
            const { image } = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ vendorCode, name, price, image: fileName, typeId })
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getByType(req, res) {
        let { typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = limit * (page - 1)
        let products;
        if (!typeId) {
            products = await Product.findAndCountAll({ limit, offset })
        }
        else {
            products = await Product.findAndCountAll({ where: { typeId }, limit, offset })
        }
        return res.json(products)
    }

    async getById(req, res) {
        const { productId } = req.query
        const product = await Product.findOne({
            where: { productId }
        })
        return res.json(product)
    }

    async getByVendorCode(req, res) {
        const { vendorCode } = req.query
        const product = await Product.findAndCountAll({
            where: { vendorCode }
        })
        return res.json(product)
    }
}
module.exports = new ProductsController()