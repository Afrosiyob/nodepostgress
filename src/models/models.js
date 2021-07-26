const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connection/connect");

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
const Movie = sequelize.define(
    "Movie", {
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

(async() => {
    // one-to-one => hasOne, belongsTo
    // Model1.hasOne(Model2)
    // Model2.belongsTo(Model1)
    User.hasOne(Product, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    Product.belongsTo(User);

    // one-to-one => hasOne, belongsTo
    // Model1.hasOne(Model2)
    // Model2.belongsTo(Model1)
    User.hasOne(Token, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    Token.belongsTo(User);

    // one-to-many => hasMany, belongsTo
    // Model1.hasMany(Model2)
    // Model2.belongsTo(Model1)

    // many-to-many => hasMany, belongsToMany
    // Model1.belongsToMany(Model2)
    // Model2.belongsToMany(Model1)

    User.belongsToMany(User, {
        as: "User",
        foreignKey: "UserId",
        through: "Followers",
    });

    User.belongsToMany(User, {
        as: "Followed",
        foreignKey: "FollowedId",
        through: "Followers",
    });
})();

module.exports = {
    User,
    Product,
    Car,
    Token,
    Movie,
};