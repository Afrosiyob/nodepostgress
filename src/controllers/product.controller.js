const { ApiError } = require( "../errors/apiError" )
const { Product, User } = require( "../models/models" )
const _ = require( "lodash" )
const createProduct = async ( req, res, next ) => {
    const { name } = req.body
    const { userId } = req.user
    const product = await Product.findOne( { where: { name } } )
    if ( product ) {
        await next( ApiError.BadRequestError( `faild name: ${ name }`, 'please enter other name' ) )
    } else {
        const newProduct = await Product.create( {
            name,
            UserId: userId
        } )
        await res.status( 200 ).json( {
            data: _.pick( newProduct, [ "id", "name", "UserId" ] ),
            message: "new product created"
        } )
    }
}


const getProducts = async ( req, res, next ) => {
    const { userId } = req.user;
    const user = await User.findByPk( userId )
    const { role } = user;
    let products;
    if ( role === "admin" ) {
        console.log( role );
        products = await Product.findAll()
    } else {
        products = await Product.findAll( { where: { UserId: userId } } );
    }
    res.status( 200 ).json( {
        data: products,
        message: "all products"
    } )
}

module.exports = {
    createProduct,
    getProducts
}