const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { ApiError } = require("../errors/apiError");
const { logger } = require("../logger/logger");

const createUser = async(req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user === null) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ username, password: hashedPassword });
        console.log(newUser);
        res.status(200).json({ message: "new user created" });
    } else {
        console.log(user instanceof User); // true
        logger.error("same username");
        next(
            ApiError.BadRequestError(
                `failed ${username}`,
                "please enter other username"
            )
        );
    }
};

module.exports = {
    createUser,
};