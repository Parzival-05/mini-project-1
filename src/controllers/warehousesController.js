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
            throw new Error("Amount must be a positive integer number")
        }
        const product = await Product.findOne({ where: { vendorCode } })
        if (!product) {
            throw new Error("Product is not found")
        }
        var listOfWarehouse = await ListOfProducts.findOne({ where: { warehouseId, vendorCode } })
        if (listOfWarehouse) {
            if (op == 'DELETE') {
                listOfWarehouse.amount -= await amount
                if (listOfWarehouse.amount < 0) {
                    listOfWarehouse.amount = 0
                }
            }
            else {
                listOfWarehouse.amount += amount
            }
            await listOfWarehouse.save()
        }
        else {
            if (op == 'DELETE') {
                listOfWarehouse = await ListOfProducts.create({ warehouseId, vendorCode, amount: 0 })
            }
            else {
                listOfWarehouse = await ListOfProducts.create({ warehouseId, vendorCode, amount })
            }
        }
        return listOfWarehouse
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
            if (warehouse == 0) {
                info.message = `There is no warehouse with id ${warehouseId}`
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
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteProduct(req, res, next) {
        try {
            var { vendorCode, amount, warehouseId } = req.body
            const listOfProducts = await this.updateAmountOfProducts(vendorCode, amount, warehouseId, OPERATIONS.DELETE)
            return res.json(listOfProducts)
        }
        catch (e) {
            console.log(e)
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