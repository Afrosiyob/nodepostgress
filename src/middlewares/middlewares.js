const { validationResult } = require( "express-validator" );
const { ApiError } = require( "../errors/apiError" );
const config = require( "config" );
const jwt = require( "jsonwebtoken" );
const { User } = require( "../models/user.model" );


const validationError = async ( req, res, next ) => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        next( ApiError.BadRequestError( errors.array(), "badrequest error" ) )
    } else {
        await next();
    }
};


const checkAuthToken = async ( req, res, next ) => {
    if ( req.method === 'OPTIONS' ) {
        await next()
    } else {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith( "Bearer" )
        ) {
            token = req.headers.authorization.split( " " )[ 1 ]; // "Bearer TOKEN"
        }
        if ( !token ) {
            await res.status( 401 ).json( { message: "auth error try middleware" } );
        } else {
            try {
                let decoded = jwt.verify( token, config.get( "jwtSecret" ) );
                req.user = decoded;
                res.setHeader( "Last-Modified", new Date().toUTCString() );
                await next();
            } catch ( error ) {

                next( ApiError.UnauthorizedError( error, "invalid token" ) )
            }
        }
    }
}

// Check permissions
const setPermissions = ( permissions ) => async ( req, res, next ) => {
    const { userId } = req.user;
    const user = await User.findByPk( userId );
    if ( !user ) {
        next( ApiError.UnauthorizedError( "faild role", "no role" ) )
    } else {
        const { role } = user;
        if ( permissions.includes( role ) ) {
            await next();
        } else {
            next( ApiError.ForbiddenError( "no permession" ) )
        }
    }
};



module.exports = {
    validationError,
    checkAuthToken,
    setPermissions
}