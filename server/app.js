const express = require( "express" )
const config = require( "config" )

// Create server with app
const app = express()

// Get PORT
const PORT = config.get( "PORT" ) || process.env.PORT || 5000

// Start server
app.listen( PORT, () => console.log( `server is running on ${ PORT }` ) )
