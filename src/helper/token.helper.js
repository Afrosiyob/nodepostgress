const jwt = require("jsonwebtoken");
const config = require("config");
const uuid = require("uuid");
const { Token } = require("../models/models");

const generateAccessToken = (userId) => ({
    access_token: jwt.sign({ userId, type: "access" }, config.get("jwtSecret"), {
        expiresIn: "1m",
    }),
});
const generateRefreshToken = () => {
    const id = uuid();
    return {
        id: id,
        refresh_token: jwt.sign({ id: id, type: "refresh" },
            config.get("jwtSecret"), {
                expiresIn: "2m",
            }
        ),
    };
};

const replaceFromDBRefreshToken = async(tokenId, userId) =>
    await Token.findOne({ where: { tokenId } })
    .then(async(token) => {
        await Token.create({
                tokenId: tokenId,
                UserId: userId,
            })
            .then((new_token) => console.log(new_token))
            .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceFromDBRefreshToken,
};