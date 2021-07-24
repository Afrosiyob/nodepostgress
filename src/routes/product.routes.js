const { Router } = require( "express" )
const { createProduct, getProducts } = require( "../controllers/product.controller" )
const { validationError, checkAuthToken } = require( "../middlewares/middlewares" )
const { productValidation } = require( "../validations/product.validation" )

const router = Router()

router.post( "/create", checkAuthToken, productValidation, validationError, createProduct )
router.get( "/", checkAuthToken, getProducts )
// router.get( "/:productId", getProduct )
// router.put( "/:productId", updateProduct )
// router.post( "/:productId", deleteProduct )

module.exports = {
    productRouter: router
}