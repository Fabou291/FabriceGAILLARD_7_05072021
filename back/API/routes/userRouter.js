const express = require("express");
const userController = require("../controllers/userController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");

const router = express.Router();

router.get('/', authenticationMiddleware, userController.findAll);

router.get('/:id', authenticationMiddleware, userController.findOne);

router.post('/', authenticationMiddleware, userController.create);

router.put('/:id', authenticationMiddleware, userController.modify);

router.delete('/:id', authenticationMiddleware, userController.remove);

module.exports = router;