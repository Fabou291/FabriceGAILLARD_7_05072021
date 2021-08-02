const express = require("express");
const authenticationController = require("../controllers/authenticationController.js");
const userController = require("../controllers/userController.js");
const emailMiddleware = require("../middleware/emailMiddleware.js");
const passwordMiddleware = require("../middleware/passwordMiddleware.js");
const router = express.Router();

router.post(
    "/login", 
    emailMiddleware.checkValidity, 
    emailMiddleware.encrypt, 
    authenticationController.login
);

router.post(
    "/register",
    emailMiddleware.checkValidity,
    passwordMiddleware.checkValidity,
    emailMiddleware.encrypt,
    passwordMiddleware.encrypt,
    userController.create
);

module.exports = router;
