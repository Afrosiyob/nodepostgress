const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs")
const _ = require("lodash");
const { ApiError } = require("../errors/apiError");
const { logger } = require("../logger/logger");

const createUser = async(req, res, next) => {
    const { username, password } = req.body
    const checkUser = await UserModel.findOne({ where: { username } });
    if (checkUser === null) {
        const hashedPassword = await bcrypt.hash(password, 12)
        await UserModel.create({
            username,
            password: hashedPassword
        }).then(user => {
            console.log(user);
            res.status(201).json({
                message: "new user created"
            })
        }).catch(error => {
            console.log(error);
            logger.error(error);
        })
    } else {
        next(ApiError.BadRequestError(`failed ${ username }`, "please enter other username"))
    }

}

module.exports = {
    createUser
}