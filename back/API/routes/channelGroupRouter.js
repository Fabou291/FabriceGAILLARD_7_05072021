import express from "express";
import channelGroupController from "../controllers/channelGroupController.js"

const router = express.Router();

router.get('/', channelGroupController.findAll);

router.get('/:id', channelGroupController.findOne);

router.post('/', channelGroupController.create);

router.put('/:id', channelGroupController.modify);

router.delete('/:id', channelGroupController.remove);

export default router;