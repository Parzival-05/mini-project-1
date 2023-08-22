const { Product, Warehouse, ListOfProducts } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');

class ProductsController {
    // eslint-disable-next-line no-unused-vars
    async edit(req, res, next) {
    }

    async add(req, res, next) {
        try {
            const { vendorCode, name, price, typeId } = req.body
            const { image } = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ vendorCode, name, price, image: fileName, typeId })
            return res.json(product)
        } catch (e) {
            if (e.name == "SequelizeUniqueConstraintError") {
                next(ApiError.badRequest("Product with such name or vendor code is already exist"))
            }
            else {
                next(ApiError.badRequest(e.message))
            }
        }
    }

    async delete(req, res, next) {
        try {
            const { vendorCode } = req.body
            const product = await Product.findOne({ where: { vendorCode } })
            if (product) {
                fs.unlink(path.resolve(__dirname, '..', 'static', product.image), async () => {
                    await ListOfProducts.destroy({ where: { vendorCode } })
                    return await Product.destroy({ where: { vendorCode } })
                })
            }
            else {
                throw new Error(`There is no product with vendor code ${vendorCode}`)
            }
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
        const product = await Product.findOne({
            where: { vendorCode }
        })
        return res.json(product)
    }
}
module.exports = new ProductsController()