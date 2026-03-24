
import express from "express";
import { sendNewWhatsAppMessage } from "./whatsapp.controller.js";

const router = express.Router();

// Path: POST http://localhost:3000/api/whatsapp/send
router.post("/send", sendNewWhatsAppMessage);

export default router;