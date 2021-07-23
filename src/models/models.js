const { DataTypes } = require( "sequelize" );
const { sequelize } = require( "../../connection/connect" );

// User Model
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

// Product model
const Product = sequelize.define(
    "Product", {
    name: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    freezeTableName: true,
}
);

const Car = sequelize.define(
    "Car", {
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    freezeTableName: true,
}
);

( async () => {
    User.hasOne( Product )
    Product.belongsTo( User )
} )();

module.exports = {
    User,
    Product,
    Car
}