import express from "express";
import { sendWhatsAppController } from "./whatsapp.controller.js";

const router = express.Router();

router.post("/send", sendWhatsAppController);

export default router;