/* eslint-disable no-unused-vars */
const { Warehouse, ListOfProducts, Product } = require('../models')
const ApiError = require('../error/ApiError')
const OPERATIONS = { DELETE: 'DELETE', ADD: 'ADD' }

class WarehousesController {
    async updateAmountOfProducts(vendorCode, amount, warehouseId, op) {
        amount = Number(amount)
        if (!amount) {
            amount = 1
        }
        if (amount <= 0 || !Number.isInteger(amount)) {
            throw new Error("The number to be deleted must be a positive integer number")
        }
        const properties = { vendorCode }
        const product = await Product.findOne({ where: properties })
        if (!product) {
            throw new Error("Product is not found")
        }
        properties.warehouseId = warehouseId
        let listOfWarehouse = await ListOfProducts.findOne({ where: properties })
        if (listOfWarehouse) {
            if (op === 'DELETE') {
                if (listOfWarehouse.amount < amount) {
                    throw new Error("The number to be deleted must be less or equal than the current amount of products in the warehouse")
                }
                listOfWarehouse.amount -= amount
            }
            else {
                listOfWarehouse.amount += amount
            }
            await listOfWarehouse.save()
            return listOfWarehouse
        }
        else {
            throw new Error("There is no such a warehouse")
        }
    }

    async create(req, res, next) {
        try {
            const { country, region, city, streetName, buildingNumber, extraInfo } = req.body
            const warehouseInfo = await Warehouse.create({ country, region, city, streetName, buildingNumber, extraInfo })
            return res.json(warehouseInfo)
        }
        catch (e) { next(ApiError.badRequest(e.message)) }
    }

    async delete(req, res, next) {
        try {
            const { warehouseId } = req.body
            const warehouse = await Warehouse.destroy({ where: { warehouseId } })
            const info = { message: `The warehouse with id ${warehouseId} is successfully deleted` }
            if (warehouse === 0) {
                info.message = "There is no such a warehouse"
            }
            return res.json(info)
        }
        catch (e) { next(ApiError.badRequest(e.message)) }
    }

    async addProduct(req, res, next) {
        try {
            var { vendorCode, amount, warehouseId } = req.body
            const listOfProducts = await this.updateAmountOfProducts(vendorCode, amount, warehouseId, OPERATIONS.ADD)
            return res.json(listOfProducts)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteProduct(req, res, next) {
        try {
            var { vendorCode, amount, warehouseId } = req.body
            return res.json(await this.updateAmountOfProducts(vendorCode, amount, warehouseId, OPERATIONS.DELETE))
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const types = await Warehouse.findAll()
        return res.json(types)
    }

    async getByID(req, res) {
        const { warehouseId } = req.query
        var response = await Warehouse.findOne({ where: { warehouseId } })
        if (!response) {
            response = { message: "There is no such warehouse" }
        }
        return res.json(response)
    }
}

module.exports = new WarehousesController()