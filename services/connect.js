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
        // await UserModel.sync( { force: true } );
        // console.log( "The table for the User model was just (re)created!" );
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