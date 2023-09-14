// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'User'.
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Product'.
const Product = sequelize.define('product', {
    vendorCode: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    typeId: { type: DataTypes.INTEGER, allowNull: false }
})

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Warehouse'... Remove this comment to see the full error message
const Warehouse = sequelize.define('warehouse', {
    warehouseId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    country: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    streetName: { type: DataTypes.STRING, allowNull: false },
    buildingNumber: { type: DataTypes.INTEGER, allowNull: false },
    extraInfo: { type: DataTypes.STRING }
})

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'ListOfProd... Remove this comment to see the full error message
const ListOfProducts = sequelize.define('listOfProducts', {
    listId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    warehouseId: { type: DataTypes.INTEGER, allowNull: false },
    vendorCode: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
})

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Type'.
const Type = sequelize.define('type', {
    typeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
})

const ProductWarehouse = sequelize.define('productWarehouse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

Type.hasMany(Product)
Product.belongsTo(Type)


Warehouse.hasMany(ListOfProducts)
ListOfProducts.belongsTo(Warehouse)


Product.belongsToMany(Warehouse, { through: ProductWarehouse })
Warehouse.belongsToMany(Product, { through: ProductWarehouse })


module.exports = {
    User,
    Product,
    Warehouse,
    ListOfProducts,
    Type,
    ProductWarehouse
}
