const { DataTypes } = require( 'sequelize' );
const { sequelize } = require( '../../services/connectDB' );

const UserModel = sequelize.define( 'User', {
    // Model attributes are defined here

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    timestamps: false,

    freezeTableName: true,
} );

module.exports = {
    UserModel
}