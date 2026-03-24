import axios from "axios";
import { catchAsyncErrors } from "./middleware";

export const sendNewWhatsAppMessage = catchAsyncErrors(async (req, res, next) => {
    const { recipientNumber, messageText } = req.body;

    if (!recipientNumber || !messageText) {
        return res.status(400).json({
            success: false,
            message: "recipientNumber and messageText are required",
        });
    }

    // Format number → WhatsApp format
    const cleanNumber = recipientNumber.replace(/\D/g, "");
    const whatsappId = `${cleanNumber}@s.whatsapp.net`;

    try {
        const response = await axios.post(
            `${process.env.UNIPILE_BASE_URL}/chats`,
            {
                account_id: process.env.UNIPILE_ACCOUNT_ID,
                attendees_ids: [whatsappId],
                text: messageText,
            },
            {
                headers: {
                    "X-API-KEY": process.env.UNIPILE_API_KEY,
                    "Content-Type": "application/json",
                    "accept": "application/json",
                },
            }
        );

        return res.status(200).json({
            success: true,
            full_response: response.data,
        });

    } catch (error) {
        console.error("❌ WhatsApp Error:", error.response?.data || error.message);

        return res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data || error.message,
        });
    }
});