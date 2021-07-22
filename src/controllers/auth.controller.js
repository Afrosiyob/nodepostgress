const { ApiError } = require( "../errors/apiError" );
const { User } = require( "../models/user.model" );
const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
const _ = require( "lodash" );
const config = require( "config" );

const authLogin = async ( req, res, next ) => {
    const { username, password } = req.body
    const user = await User.findOne( { where: { username } } );
    if ( user === null ) {
        next( ApiError.NotFoundError( `${ username } not found` ) )
    } else {
        const isMatchPassword = await bcrypt.compare( password, user.password )
        if ( !isMatchPassword ) {
            next( ApiError.BadRequestError( "failed password", "please enter currect password" ) )
        } else {
            const token = jwt.sign( { userId: user.id },
                config.get( "jwtSecret" ), { expiresIn: "1h" }
            );
            res.status( 200 ).json( {
                data: { token, user_info: _.pick( user, [ "username", "role" ] ) },
                message: "user info ",
            } )
        }
    }
}

const authMe = async ( req, res, next ) => {
    const { userId } = req.user
    const user = await User.findByPk( userId );
    if ( !user ) {
        next( ApiError.UnauthorizedError( "failid token", "wrong or invalid token" ) )
    } else {
        res.status( 200 ).json( {
            data: { user_info: _.pick( user, [ "username", "role" ] ) },
            message: "user info"
        } )
    }
}




module.exports = {
    authLogin,
    authMe
}