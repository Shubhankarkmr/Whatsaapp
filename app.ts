import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import whatsappRoutes from "./whatsapp.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/whatsapp", whatsappRoutes);

app.get("/", (req, res) => {
    res.send("OrbitAIM WhatsApp Server is Live! 🚀");
});

/* ===============================
   🔥 GLOBAL ERROR HANDLER (Required)
=============================== */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[Error]: ${message}`);

    res.status(statusCode).json({
        success: false,
        message: message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});