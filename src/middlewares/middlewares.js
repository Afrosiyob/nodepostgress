const { validationResult } = require("express-validator");
const { ApiError } = require("../errors/apiError");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const validationError = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(ApiError.BadRequestError(errors.array(), "badrequest error"));
    } else {
        await next();
    }
};

const checkAuthToken = async(req, res, next) => {
    if (req.method === "OPTIONS") {
        await next();
    } else {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
        }
        if (!token) {
            await next(ApiError.UnauthorizedError("faild token", "auth error"));
        } else {
            try {
                let decoded = jwt.verify(token, config.get("jwtSecret"));
                req.user = decoded;
                res.setHeader("Last-Modified", new Date().toUTCString());
                await next();
            } catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    next(ApiError.BadRequestError(error, "token  exparied"));
                } else if (error instanceof jwt.JsonWebTokenError) {
                    next(ApiError.BadRequestError(error, "invalid token"));
                }
            }
        }
    }
};

// Check permissions
const setPermissions = (permissions) => async(req, res, next) => {
    const { userId } = req.user;
    const user = await User.findByPk(userId);
    if (!user) {
        next(ApiError.UnauthorizedError("faild role", "no role"));
    } else {
        const { role } = user;
        if (permissions.includes(role)) {
            await next();
        } else {
            next(ApiError.ForbiddenError("no permession"));
        }
    }
};

// const getProductsByUser = async ( req, res, next ) => {
//     const { userId } = req.user;
//     const user = await UserModel.findById( userId );
//     const { role } = user;
//     if ( role === "admin" ) {
//         req.products = await Product.find();
//     } else {
//         req.products = await Product.find( { UserId: userId } );
//     }
//     next();
// };

module.exports = {
    validationError,
    checkAuthToken,
    setPermissions,
};