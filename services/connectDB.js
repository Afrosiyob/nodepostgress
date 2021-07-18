const { Sequelize } = require( 'sequelize' );
const { logger } = require( '../src/logger/logger' );

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize( 'node_postgres', 'postgres', '2230102ab', {
    host: 'localhost',
    dialect: "postgres"
} );

const connectSequelize = async () => {
    try {
        await sequelize.authenticate();
        console.log( 'Connection has been established successfully.' );
    } catch ( error ) {
        logger.error( error );
        console.error( 'Unable to connect to the database:', error );
    }
}

module.exports = {
    connectSequelize,
    sequelize
}