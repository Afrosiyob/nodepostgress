const jwt = require("jsonwebtoken");
const config = require("config");
const { v4: uuidv4 } = require("uuid");
const { Token } = require("../models/models");
const { logger } = require("../logger/logger");

const generateAccessToken = (userId) => ({
    accessToken: jwt.sign({ userId: userId, type: "access" },
        config.get("jwtSecret"), { expiresIn: "1m" }
    ),
});

const generateRefreshToken = () => {
    const tokenId = uuidv4();
    return {
        tokenId: tokenId,
        refreshToken: jwt.sign({ tokenId: tokenId, type: "refresh" },
            config.get("jwtSecret"), { expiresIn: "5m" }
        ),
    };
};

const replaceFromDBRefreshToken = async(tokenId, userId) =>
    await Token.findOne({ where: { UserId: userId } })
    .then(async(token) => {
        if (token !== null) {
            await Token.destroy({ where: { UserId: token.UserId } }).then(
                async() => {
                    await Token.create({ tokenId: tokenId, UserId: userId })
                        .then(() => {
                            console.log("new referesh token created");
                        })
                        .catch((error) => {
                            logger.error(error);
                            console.log(error);
                        });
                }
            );
        } else {
            await Token.create({ tokenId: tokenId, UserId: userId })
                .then(() => {
                    console.log("new referesh token created");
                })
                .catch((error) => {
                    logger.error(error);
                    console.log(error);
                });
        }
    })
    .catch((error) => {
        logger.error(error);
        console.log(error);
    });

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceFromDBRefreshToken,
};