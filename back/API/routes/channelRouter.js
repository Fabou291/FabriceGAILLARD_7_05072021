import express from "express";
import channelController from "../controllers/channelController.js"

const router = express.Router();

router.get('/', channelController.findAll);

router.get('/:id', channelController.findOne);

router.post('/', channelController.create);

router.put('/:id', channelController.modify);

router.delete('/:id', channelController.remove);


export default router;