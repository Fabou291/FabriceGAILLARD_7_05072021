import express from "express";
import roleController from "../controllers/roleController.js";
const router = express.Router();

router.get('/',roleController.findAll)

router.get('/:id',roleController.findOne)

router.post('/',roleController.create)

router.put('/:id',roleController.modify)

router.delete('/:id',roleController.remove)

export default router;