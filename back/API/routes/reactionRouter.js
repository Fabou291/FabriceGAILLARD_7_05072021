const express = require("express");
const reaction = require("../controllers/reactionController.js")
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");

const router = express.Router();

router.post('/', authenticationMiddleware, reaction.create);

router.delete('/:id', authenticationMiddleware, reaction.remove);

module.exports = router;