const { Type } = require('../models/models')
// eslint-disable-next-line no-unused-vars
const ApiError = require('../error/ApiError')

class TypesController {
    async add(req, res) {
        const { name } = req.body
        const type = await Type.create({ name })
        return res.json(type)
    }

    // eslint-disable-next-line no-unused-vars
    async delete(req, res) {
        const { name } = req.body
        const type = await Type.delete({ name })
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAndCountAll()
        return res.json(types)
    }
}

module.exports = new TypesController()