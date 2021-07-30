import express from "express";
import channelGroupController from "../controllers/channelGroupController.js";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";

const router = express.Router();

router.get('/', authenticationMiddleware, channelGroupController.findAll);

router.get('/:id', authenticationMiddleware, channelGroupController.findOne);

router.post('/', authenticationMiddleware, channelGroupController.create);

router.put('/:id', authenticationMiddleware, channelGroupController.modify);

router.delete('/:id', authenticationMiddleware, channelGroupController.remove);

export default router;