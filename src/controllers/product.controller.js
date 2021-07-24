const { ApiError } = require("../errors/apiError");
const { Product, User } = require("../models/models");
const _ = require("lodash");
const { logger } = require("../logger/logger");

const createProduct = async(req, res, next) => {
    const { name } = req.body;
    const { userId } = req.user;
    const product = await Product.findOne({ where: { name } });
    if (product) {
        next(
            ApiError.BadRequestError(`faild name: ${name}`, "please enter other name")
        );
    } else {
        const newProduct = await Product.create({
            name,
            UserId: userId,
        });
        await newProduct.save();
        res.status(200).json({
            data: _.pick(newProduct, ["id", "name", "UserId"]),
            message: "new product created",
        });
    }
};

const getProducts = async(req, res, next) => {
    const { userId } = req.user;
    const user = await User.findByPk(userId);
    const { role } = user;
    let products;
    if (role === "admin") {
        console.log(role);
        products = await Product.findAll();
    } else {
        products = await Product.findAll({ where: { UserId: userId } });
    }
    res.status(200).json({
        data: products,
        message: "all products",
    });
};

const getProduct = async(req, res, next) => {
    const { productId } = req.params;
    await Product.findByPk(productId)
        .then((data) => {
            res.status(200).json({
                data: _.pick(data, ["id", "name", "UserId"]),
                message: "single product",
            });
        })
        .catch((error) => {
            logger.error(error);
            next(ApiError.NotFoundError(`${error}`));
        });
};

const updateProduct = async(req, res, next) => {
    const { userId } = req.user;
    const { productId } = req.params;
    const { name } = req.body;
    await Product.findByPk(productId)
        .then(async(product) => {
            if (userId === product.UserId) {
                try {
                    product.name = name;
                    await product.save();
                    res.status(200).json({
                        data: _.pick(product, ["id", "name", "UserId"]),
                        message: "product updated",
                    });
                } catch (error) {
                    logger.error(error);
                    next(ApiError.BadRequestError(error, "couldnt update"));
                }
            } else {
                next(
                    ApiError.UnauthorizedError("permession", "u dont have permession")
                );
            }
        })
        .catch((error) => {
            logger.error(error);
            next(ApiError.NotFoundError(" not found "));
        });
};

const deleteProduct = async(req, res, next) => {
    const { productId } = req.params;
    const { userId } = req.user;

    await Product.findByPk(productId)
        .then(async(product) => {
            if (userId === product.UserId) {
                await Product.destroy({ where: { id: productId } })
                    .then((data) => {
                        console.log(data);
                        res.status(200).json({
                            data,
                            message: "product deleted",
                        });
                    })
                    .catch((error) => {
                        logger.error(error);
                        next(ApiError.BadRequestError(error, "couldnt removed"));
                    });
            } else {
                logger.error("no permession");
                next(ApiError.UnauthorizedError("permession", "u not have permession"));
            }
        })
        .catch((error) => {
            logger.error(error);
            next(ApiError.NotFoundError("not founded"));
        });
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};