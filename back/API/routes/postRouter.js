const express = require("express");
const post = require("../controllers/postController.js")
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");
const isAdmin = require("../middleware/isAdmin.js");
const multer = require('../middleware/multerMiddleware.js');

const router = express.Router();

router.get('/', authenticationMiddleware, post.findAll);

router.get('/:id', authenticationMiddleware, post.findOne);

router.post('/', authenticationMiddleware, multer, post.create);

router.put('/:id', authenticationMiddleware, isAdmin, post.modify);

router.delete('/:id', authenticationMiddleware, isAdmin, post.remove);

module.exports = router;