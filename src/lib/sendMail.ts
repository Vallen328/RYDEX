import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

// Function to write from our email to the user email, and we will send the otp in that email
// We will make it in such a way where we can call it again and again and can be used again and again
// Whenever we call this function, we need to tell that which email we want to send the OTP, we need to send to the other party.
// So in to ->  we will send the mail to those email address which we want to send the OTP, and we will send the OTP in that email address.
// also sending subject in the mail
//html -> If u want to bold something in Mail, or u want to give some color to the text, then we can use html for that, and we can send the OTP in that html
export const sendMail = async(to: string, subject: string, html: string) => { 
    await transporter.sendMail({
        from: `"RYDEX" <${process.env.EMAIL}>`,   //This is the email address from which we will send the OTP, and we can give it a name also, that is RYDEX
        to,
        subject,
        html
    })
}

