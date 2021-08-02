const express = require("express");
const roleController = require("../controllers/roleController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");

const router = express.Router();

router.get('/', authenticationMiddleware, roleController.findAll)

router.get('/:id', authenticationMiddleware, roleController.findOne)

router.post('/', authenticationMiddleware, roleController.create)

router.put('/:id', authenticationMiddleware, roleController.modify)

router.delete('/:id', authenticationMiddleware, roleController.remove)

module.exports = router;