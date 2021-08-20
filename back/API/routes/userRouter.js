const express = require("express");
const userController = require("../controllers/userController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");
const emailMiddleware = require("../middleware/emailMiddleware.js");
const passwordMiddleware = require("../middleware/passwordMiddleware.js");
const multer = require('../middleware/multerMiddleware.js');

const router = express.Router();

router.get('/', authenticationMiddleware, userController.findAll);

router.put(
    '/:id/reset-password', 
    authenticationMiddleware,
    passwordMiddleware.checkToReset,
    passwordMiddleware.checkValidity, 
    passwordMiddleware.encrypt, 
    userController.resetPassword
);

router.put(
    '/:id/reset-email', 
    authenticationMiddleware,
    emailMiddleware.checkToReset,
    emailMiddleware.checkValidity, 
    emailMiddleware.encrypt,
    userController.resetMail
);

router.get('/:id', authenticationMiddleware, userController.findOne);

router.post('/', authenticationMiddleware, userController.create);

router.put('/:id', authenticationMiddleware, multer, userController.modify);

router.delete('/:id', authenticationMiddleware, userController.remove);

module.exports = router;