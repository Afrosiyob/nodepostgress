const { ApiError } = require("../errors/apiError");
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
const nodemailer = require("nodemailer");
// const { sendMessage } = require("../utils/send.message");

const authLogin = async(req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user === null) {
        next(ApiError.NotFoundError(`${username} not found`));
    } else {
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            next(
                ApiError.BadRequestError(
                    "failed password",
                    "please enter currect password"
                )
            );
        } else {
            const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
                expiresIn: "1h",
            });
            res.status(200).json({
                data: { token, user_info: _.pick(user, ["username", "role"]) },
                message: "user info ",
            });
        }
    }
};

const authMe = async(req, res, next) => {
    const { userId } = req.user;
    const user = await User.findByPk(userId);
    if (!user) {
        next(ApiError.UnauthorizedError("failid token", "wrong or invalid token"));
    } else {
        res.status(200).json({
            data: { user_info: _.pick(user, ["username", "role"]) },
            message: "user info",
        });

        // Send message
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "leoafrosiyob.a97@gmail.com",
                pass: "2230102ab",
            },
        });

        let mailOptions = {
            from: "leoafrosiyob.a97@gmail.com",
            to: "noligarx@gmail.com",
            subject: "Nodirboy cho tam nma gap.....",
            text: "ishla yaxshimi buvottimi chichib kelamizmi",
            html: "<b>Hello world?</b> <img src='https://cq-esports.com/storage/uploads/images/83795/image8.jpg' width='200px' alt='dota image' />", // html body
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err);
                console.log("error send mail message");
            } else {
                console.log("success send mail message");
            }
        });
    }
};

module.exports = {
    authLogin,
    authMe,
};