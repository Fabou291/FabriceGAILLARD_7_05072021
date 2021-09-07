const express = require("express");
const channelController = require("../controllers/channelController.js")
const authenticationMiddleware = require("../middleware/authenticationMiddleware.js");
const isAdmin = require("../middleware/isAdmin.js");

const router = express.Router();

router.get('/', authenticationMiddleware, channelController.findAll);

router.get('/byGroup', authenticationMiddleware, channelController.findAllByGroup);

router.get('/:id/post', authenticationMiddleware, channelController.findAllPostOfChannel);

router.get('/:id', authenticationMiddleware, channelController.findOne);

router.post('/', authenticationMiddleware, isAdmin, channelController.create);

router.put('/:id', authenticationMiddleware, isAdmin, channelController.modify);

router.delete('/:id', authenticationMiddleware, isAdmin, channelController.remove);


module.exports = router;