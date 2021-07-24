const { Router } = require("express");
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");
const {
    validationError,
    checkAuthToken,
} = require("../middlewares/middlewares");
const { productValidation } = require("../validations/product.validation");

const router = Router();

router.post(
    "/create",
    checkAuthToken,
    productValidation,
    validationError,
    createProduct
);
router.get("/", checkAuthToken, getProducts);
router.get("/:productId", getProduct);
router.put("/:productId", checkAuthToken, updateProduct);
router.delete("/:productId", checkAuthToken, deleteProduct);

module.exports = {
    productRouter: router,
};