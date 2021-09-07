const express = require("express");
const roleController = require("../controllers/roleController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");
const isAdmin = require("../middleware/isAdmin.js");

const router = express.Router();

router.get('/', authenticationMiddleware, roleController.findAll)

router.get('/:id', authenticationMiddleware, roleController.findOne)

router.post('/', authenticationMiddleware, isAdmin, roleController.create)

router.put('/:id', authenticationMiddleware, isAdmin, roleController.modify)

router.delete('/:id', authenticationMiddleware, isAdmin, roleController.remove)

module.exports = router;