const { check } = require( "express-validator" )


const productValidation = [
    check( "name", "please enter name" ).isLength( { min: 3 } )
]

module.exports = {
    productValidation
}