import nodemailer from "nodemailer"
import User from "../models/User"
import bcryptjs from 'bcryptjs';

interface SendProps{
    email: string;
    emailType: string;
    userId: string;
}

export const sendMail = async ({email, emailType, userId}: SendProps) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }, {new: true});
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }, {new: true});
        }

        const transporter = await nodemailer.createTransport({
            pool: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const subject = emailType === "VERIFY" ? "Verify Your Account": "Reset Your Password"
        const html = `<p>
        Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail" : "forgotPassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your account": "reset your password"}</p>`
        
        const mailOptions = {
            from: 'danosiddiqui203@gmail.com',
            to: email,
            html: html,
            subject: subject
        }
        
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse;

    }catch(error:any){
        throw new Error(error.message)
    }
}