const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email, token) => {

    const verifyUrl = `http://localhost:5173/verify-email/${token}`;

    await transporter.sendMail({
        from: `"ResumeAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your ResumeAI Account",

        html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:30px;">
            <h2>Welcome to ResumeAI 👋</h2>

            <p>Thank you for creating an account.</p>

            <p>Please verify your email by clicking the button below.</p>

            <a
                href="${verifyUrl}"
                style="
                    display:inline-block;
                    padding:12px 24px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:8px;
                    font-weight:bold;
                "
            >
                Verify Email
            </a>

            <p style="margin-top:20px;">
                This verification link expires in 15 minutes.
            </p>

            <hr>

            <small>
                If you didn't create this account, you can safely ignore this email.
            </small>

        </div>
        `,
    });

};

module.exports = sendVerificationEmail;