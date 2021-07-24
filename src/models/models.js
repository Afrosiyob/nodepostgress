const { DataTypes } = require( "sequelize" );
const { sequelize } = require( "../../connection/connect" );

// User Model
const User = sequelize.define(
    "User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
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
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
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
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    freezeTableName: true,
}
);

const Token = sequelize.define(
    "Token", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tokenId: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    freezeTableName: true,
}
);

// Associations

( async () => {
    User.hasOne( Product );
    User.hasOne( Token );
    Product.belongsTo( User );
    Token.belongsTo( User );
} )();

module.exports = {
    User,
    Product,
    Car,
    Token,
};