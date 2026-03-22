import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import whatsappRoutes from "./whatsapp.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/whatsapp", whatsappRoutes);

app.get("/", (req, res) => {
    res.send("WhatsApp Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});