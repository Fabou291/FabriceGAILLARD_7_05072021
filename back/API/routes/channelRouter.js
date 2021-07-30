import express from "express";
import channelController from "../controllers/channelController.js"
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";


const router = express.Router();

router.get('/', authenticationMiddleware, channelController.findAll);

router.get('/:id', authenticationMiddleware, channelController.findOne);

router.post('/', authenticationMiddleware, channelController.create);

router.put('/:id', authenticationMiddleware, channelController.modify);

router.delete('/:id', authenticationMiddleware, channelController.remove);


export default router;