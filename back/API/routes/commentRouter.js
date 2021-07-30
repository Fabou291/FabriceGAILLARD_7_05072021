import express from "express";
import commentController from "../controllers/commentController.js";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";

const router = express.Router();

router.get('/', authenticationMiddleware, commentController.findAll)

router.get('/:id', authenticationMiddleware, commentController.findOne)

router.post('/', authenticationMiddleware, commentController.create)

router.put('/:id', authenticationMiddleware, commentController.modify)

router.delete('/:id', authenticationMiddleware, commentController.remove)

export default router;