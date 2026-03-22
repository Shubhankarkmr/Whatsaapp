import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

if (!accountSid || !authToken || !fromNumber) {
  throw new Error("Twilio credentials missing in .env");
}

const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (to: string, message: string) => {
  const response = await client.messages.create({
    body: message,
    from: fromNumber,
    to: `whatsapp:${to}`,
  });

  return response;
};