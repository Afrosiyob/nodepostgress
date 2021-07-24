const jwt = require( "jsonwebtoken" );
const config = require( "config" );
const { v4: uuidv4 } = require( 'uuid' );
const { Token } = require( "../models/models" );

const generateAccessToken = ( userId ) => (
    jwt.sign(
        { userId: userId, type: "access" },
        config.get( "jwtSecret" ),
        { expiresIn: "1m", }
    )
);

const generateRefreshToken = () => {
    const id = uuidv4();
    return {
        id: id,
        token: jwt.sign(
            { id: id, type: "refresh" },
            config.get( "jwtSecret" ),
            { expiresIn: "2m", }
        ),
    };
};

// const replaceFromDBRefreshToken = async ( tokenId, userId ) =>
//     await Token.

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceFromDBRefreshToken,
};