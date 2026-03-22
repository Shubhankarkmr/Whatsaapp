import type { RequestHandler } from "express";
import { sendWhatsAppMessage } from "./whatsapp.service.js";

export const sendWhatsAppController: RequestHandler = async (req, res, next) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      res.status(400).json({
        success: false,
        message: "to and message required",
      });
      return;
    }

    const result = await sendWhatsAppMessage(to, message);

    res.status(200).json({
      success: true,
      sid: result.sid,
      status: result.status,
    });
  } catch (err) {
    next(err);
  }
};