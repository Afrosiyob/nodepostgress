const { Router } = require( "express" )

const router = Router()

router.post( "/create", createProduct )
router.get( "/", getProducts )
router.get( "/:productId", getProduct )
router.put( "/:productId", updateProduct )
router.post( "/:productId", deleteProduct )

module.exports = {
    productRouter: router
}