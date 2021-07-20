const { DataTypes } = require( 'sequelize' );
const { db } = require( '../../services/connect' );


const User = db.define( 'User', {
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,

    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    freezeTableName: true
    // Other model options go here
} );

// `sequelize.define` also returns the model
console.log( User === db.models.User ); // true

module.exports = {
    User
}