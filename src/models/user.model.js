const { DataTypes } = require("sequelize");
const { sequelize } = require("../../services/connect");
const { Product } = require("./product.model");

const User = sequelize.define(
    "User", {
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user",
        },
    }, {
        timestamps: true,
        freezeTableName: true,
    }
);

User.hasOne(Product);
Product.belongsTo(User);

module.exports = {
    User,
};