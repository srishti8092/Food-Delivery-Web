import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY,
    },
});

export const sendOTPMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset your password",
        text: `You requested to reset your password.

Your One-Time Password (OTP) is: ${otp}

Enter this code in the app to reset your password. This OTP is valid for 10 minutes.

If you did not request this, please ignore this email.

Thanks,
Your App Team`,
        html: `
    <p>You requested to reset your password.</p>
    <p><strong>Your One-Time Password (OTP) is:</strong></p>
    <h2 style="color: #333;">${otp}</h2>
    <p>This OTP is valid for <strong>10 minutes</strong>.</p>
    <p>If you did not request this, please ignore this email.</p>
    <br/>
    <p>Thanks,</p>
    <p><strong>Your App Team</strong></p>`,
    });
};
