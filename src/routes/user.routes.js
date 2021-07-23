const { Router } = require("express");
const { createUser } = require("../controllers/user.controller");
const { validationError } = require("../middlewares/middlewares");

const { userCreateValidation } = require("../validations/user.validation");

const router = Router();

router.post("/create", userCreateValidation, validationError, createUser);
// router.get( "/", getUsers )
// router.get( "/:userId", getUser )
// router.put( "/:userId", updateUser )
// router.delete( "/:userId", deleteUser )

module.exports = {
    userRouter: router,
};