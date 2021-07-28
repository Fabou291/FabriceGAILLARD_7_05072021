import express from "express";
import authenticationController from "../controllers/authenticationController.js";
import userController from "../controllers/userController.js";
import emailMiddleware from "../middleware/emailMiddleware.js";
import passwordMiddleware from "../middleware/passwordMiddleware.js";
const router = express.Router();

router.post(
    "/login", 
    emailMiddleware.checkValidity, 
    emailMiddleware.encrypt, 
    authenticationController.login
);

router.post(
    "/register",
    emailMiddleware.checkValidity,
    passwordMiddleware.checkValidity,
    emailMiddleware.encrypt,
    passwordMiddleware.encrypt,
    userController.create
);

export default router;
