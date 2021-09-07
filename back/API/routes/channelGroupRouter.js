const express = require("express");
const channelGroupController = require("../controllers/channelGroupController.js");
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");
const isAdmin = require("../middleware/isAdmin.js");

const router = express.Router();

router.get('/', authenticationMiddleware, channelGroupController.findAll);

router.get('/:id', authenticationMiddleware, channelGroupController.findOne);

router.post('/', authenticationMiddleware, isAdmin, channelGroupController.create);

router.put('/:id', authenticationMiddleware, isAdmin, channelGroupController.modify);

router.delete('/:id', authenticationMiddleware, isAdmin, channelGroupController.remove);

module.exports = router;