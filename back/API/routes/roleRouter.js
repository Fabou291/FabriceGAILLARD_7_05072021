import express from "express";
import roleController from "../controllers/roleController.js";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";

const router = express.Router();

router.get('/', authenticationMiddleware, roleController.findAll)

router.get('/:id', authenticationMiddleware, roleController.findOne)

router.post('/', authenticationMiddleware, roleController.create)

router.put('/:id', authenticationMiddleware, roleController.modify)

router.delete('/:id', authenticationMiddleware, roleController.remove)

export default router;