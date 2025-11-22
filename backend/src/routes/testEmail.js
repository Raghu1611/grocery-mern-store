import express from "express";
import { sendEmail } from "../utils/emailService.js";

const router = express.Router();

router.get("/send-test", async (req, res) => {
    try {
        await sendEmail(
            "your_email@gmail.com",
            "Test Email",
            "<h2>Email Service Working!</h2>"
        );

        res.json({ message: "Email sent" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Email send failed" });
    }
});

export default router;
