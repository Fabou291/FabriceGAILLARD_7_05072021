const express = require("express");
const commentController = require("../controllers/commentController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");

const router = express.Router();

router.get('/', authenticationMiddleware, commentController.findAll)

router.get('/:id', authenticationMiddleware, commentController.findOne)

router.post('/', authenticationMiddleware, commentController.create)

router.put('/:id', authenticationMiddleware, commentController.modify)

router.delete('/:id', authenticationMiddleware, commentController.remove)

module.exports = router;