const { DataTypes } = require("sequelize");
const { sequelize } = require("../../services/connect");

const Product = sequelize.define(
    "Product", {
        name: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true,
        freezeTableName: true,
        // Other model options go here
    }
);

module.exports = {
    Product,
};