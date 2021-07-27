import express from "express";
import commentController from "../controllers/commentController.js";
const router = express.Router();

router.get('/',commentController.findAll)

router.get('/:id',commentController.findOne)

router.post('/',commentController.create)

router.put('/:id',commentController.modify)

router.delete('/:id',commentController.remove)

export default router;