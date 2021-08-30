const express = require("express");
const reaction = require("../controllers/reactionController.js")
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");

const router = express.Router();

router.post('/', authenticationMiddleware, reaction.create);

router.delete('/', authenticationMiddleware, reaction.remove);

module.exports = router;