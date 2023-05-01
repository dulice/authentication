import nodemailer from 'nodemailer';

const Mail = async (email, otp) => {
    const nodeConfig = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        },
    }
    
    const mailOption = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password OTP',
        html: `You recovery OTP is <h2>${otp}</h2>`
    }
    const transporter = nodemailer.createTransport(nodeConfig);
    await transporter.sendMail(mailOption)
}

export default Mail;