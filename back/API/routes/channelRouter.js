import express from "express";
import channelController from "../controllers/channelController.js"

const router = express.Router();

router.get('/', channelController.findAll);