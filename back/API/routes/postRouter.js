import express from "express";
import post from "../controllers/channelGroupController.js"

const router = express.Router();

router.get('/', post.findAll);

router.get('/:id', post.findOne);

router.post('/', post.create);

router.put('/:id', post.modify);

router.delete('/:id', post.remove);

export default router;