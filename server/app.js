const express = require( "express" )
const config = require( "config" )
const serveIndex = require( "serve-index" );
const { connectSequelize } = require( "../services/connectDB" );
const { ErrorHandler } = require( "../src/errors/ErrorHandler" );

// Call All Routes
const { userRouter } = require( "../src/routes/user.routes" );

// Create server with app
const app = express()

// Connect DataBase
connectSequelize()

// Access json
app.use( express.json( { extended: true } ) );
app.use( express.urlencoded( { extended: false } ) );

// Static files
app.use(
    "/public",
    express.static( "public" ),
    serveIndex( "public", { icons: true } )
);

// User Router
app.use( "/api/user", userRouter )

// Error Handler
// Please put this code after last middleware
app.use( ErrorHandler )

// Get PORT
const PORT = config.get( "PORT" ) || process.env.PORT || 5000

// Start server
app.listen( PORT, () => console.log( `server is running on ${ PORT }` ) )
