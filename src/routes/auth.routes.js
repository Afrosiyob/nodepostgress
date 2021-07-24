const { Router } = require( "express" );
const { authLogin, authMe, refreshTokens } = require( "../controllers/auth.controller" );

const {
    validationError,
    checkAuthToken,
    setPermissions,
} = require( "../middlewares/middlewares" );
const { authLoginValidation } = require( "../validations/auth.validation" );

const router = Router();

router.post( "/login", authLoginValidation, validationError, authLogin );
router.get( "/me", checkAuthToken, setPermissions( "admin" ), authMe );
router.post( "/refresh-tokens", refreshTokens )

module.exports = {
    authRouter: router,
};