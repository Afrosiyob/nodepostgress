const { Sequelize } = require( 'sequelize' );
const { logger } = require( '../src/logger/logger' );


// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize( 'node_postgres', 'postgres', '2230102ab', {
    host: 'localhost',
    dialect: "postgres"
} );

const connectDB = async () => {
    try {
        await db.authenticate();
        console.log( 'Connection has been established successfully.' );
        await db.sync( { alter: true } );
        console.log( "All models were synchronized successfully." );
    } catch ( error ) {
        logger.error( error );
        console.error( 'Unable to connect to the database:', error );
    }
}

module.exports = {
    connectDB,
    db
}