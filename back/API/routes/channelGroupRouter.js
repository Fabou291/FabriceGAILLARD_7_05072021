const express = require("express");
const channelGroupController = require("../controllers/channelGroupController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");

const router = express.Router();

router.get('/', authenticationMiddleware, channelGroupController.findAll);

router.get('/:id', authenticationMiddleware, channelGroupController.findOne);

router.post('/', authenticationMiddleware, channelGroupController.create);

router.put('/:id', authenticationMiddleware, channelGroupController.modify);

router.delete('/:id', authenticationMiddleware, channelGroupController.remove);

module.exports = router;