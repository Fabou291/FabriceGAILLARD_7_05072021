import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.get('/',userController.findAll);

router.get('/:id',userController.findOne);

router.post('/',userController.create);

router.put('/:id',userController.modify);

router.delete('/:id',userController.remove);

export default router;