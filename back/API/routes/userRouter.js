import express from "express";
import userController from "../controllers/userController.js";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";

const router = express.Router();

router.get('/', authenticationMiddleware, userController.findAll);

router.get('/:id', authenticationMiddleware, userController.findOne);

router.post('/', authenticationMiddleware, userController.create);

router.put('/:id', authenticationMiddleware, userController.modify);

router.delete('/:id', authenticationMiddleware, userController.remove);

export default router;