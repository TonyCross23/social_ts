import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const sendMail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    })

    const info = await transporter.sendMail({
        from: '"Social App" <no-reply@socialapp.com>',
        to,
        subject,
        html,
    })
}