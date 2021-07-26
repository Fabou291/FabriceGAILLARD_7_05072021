import express from "express";
import authenticationController from "../controllers/authenticationController.js";
const router = express.Router();


router.get('/', authenticationController.login)

export default router;