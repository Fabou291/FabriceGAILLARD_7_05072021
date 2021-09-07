const express = require("express");
const userController = require("../controllers/userController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");
const emailMiddleware = require("../middleware/emailMiddleware.js");
const passwordMiddleware = require("../middleware/passwordMiddleware.js");
const multer = require('../middleware/multerMiddleware.js');
const isAdmin = require("../middleware/isAdmin.js");

const router = express.Router();

router.get('/', authenticationMiddleware, userController.findAll);

router.put(
    '/:id/reset-password', 
    authenticationMiddleware,
    passwordMiddleware.checkToReset,
    passwordMiddleware.checkValidity, 
    passwordMiddleware.encrypt,
    isAdmin,
    userController.resetPassword
);

router.put(
    '/:id/reset-email', 
    authenticationMiddleware,
    emailMiddleware.checkToReset,
    emailMiddleware.checkValidity, 
    emailMiddleware.encrypt,
    isAdmin,
    userController.resetMail
);

router.get('/:id', authenticationMiddleware, userController.findOne);

router.post('/', authenticationMiddleware, userController.create);

router.put('/:id', authenticationMiddleware, isAdmin, multer, userController.modify);

router.delete('/:id', authenticationMiddleware, isAdmin, userController.remove);

module.exports = router;