import express from "express";
import post from "../controllers/postController.js"
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";


const router = express.Router();

router.get('/', authenticationMiddleware, post.findAll);

router.get('/:id', authenticationMiddleware, post.findOne);

router.post('/', authenticationMiddleware, post.create);

router.put('/:id', authenticationMiddleware, post.modify);

router.delete('/:id', authenticationMiddleware, post.remove);

export default router;