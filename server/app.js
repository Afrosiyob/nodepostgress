const express = require( "express" );
const config = require( "config" );
const serveIndex = require( "serve-index" );
const morgan = require( "morgan" );
const { userRouter } = require( "../src/routes/user.routes" );
const { logger } = require( "../src/logger/logger" );
const winston = require( "winston" );
const { errorHandler } = require( "../src/errors/errorHandler" );

const compression = require( "compression" );
const cookieParser = require( "cookie-parser" );
const session = require( "express-session" );
const redis = require( "redis" );

const { authRouter } = require( "../src/routes/auth.routes" );
const path = require( "path" );
const { productRouter } = require( "../src/routes/product.routes" );

// Create App server
const app = express();

// Access json
app.use( express.json( { extended: true } ) );
app.use( express.urlencoded( { extended: false } ) );

// compression
app.use( compression() );

// Static files
app.use(
    "/public",
    express.static( "public" ),
    serveIndex( "public", { icons: true } )
);

// Static files other way
app.use( "/public", express.static( path.join( __dirname, "public" ) ) );

// Show Requests to console
if ( app.get( "env" ) === "development" ) {
    app.use( morgan( "tiny" ) );
    // Write log
    logger.add(
        new winston.transports.Console( {
            format: winston.format.simple(),
        } )
    );
}

// Api Routes
app.use( "/api/user", userRouter );
app.use( "/api/auth", authRouter );
app.use( "/api/product", productRouter );

// Error Handler
// Please put this code after last middleware
app.use( errorHandler );

// Create PORT
const PORT = config.get( "PORT" ) || process.env.PORT || 5000;
const client = redis.createClient();

client.on( "error", function ( error ) {
    console.error( error );
} );

client.set( "key", "value", redis.print );
client.get( "key", redis.print );
app.listen( PORT, () => console.log( `Server is running on ${ PORT }` ) );