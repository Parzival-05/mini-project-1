const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    vendorCode: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    typeId: { type: DataTypes.INTEGER }
})

const Warehouse = sequelize.define('warehouse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    country: { type: DataTypes.STRING, allowNull: false },
    locationInfo: { type: DataTypes.STRING, allowNull: false }
})

const ListOfProducts = sequelize.define('listOfProducts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, unique: true },
    vendorCode: { type: DataTypes.INTEGER, allowNull: false },
    warehouseId: { type: DataTypes.INTEGER, allowNull: false }
})

const ProductType = sequelize.define('productType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
})

const ProductWarehouse = sequelize.define('productWarehouse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})


ProductType.hasMany(Product)
Product.belongsTo(ProductType)


Warehouse.hasMany(ListOfProducts)
ListOfProducts.belongsTo(Warehouse)


Product.belongsToMany(Warehouse, { through: ProductWarehouse })
Warehouse.belongsToMany(Product, { through: ProductWarehouse })


module.exports = {
    User,
    Warehouse,
    ListOfProducts,
    ProductType,
    ProductWarehouse
}
