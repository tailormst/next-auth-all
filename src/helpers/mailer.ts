import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface SendEmailProps {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailProps) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        // Configure email transport
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "example@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY" ? "Verify Your Email Address" : "Reset Your Password",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #333; text-align: center;">
                        ${
                            emailType === "VERIFY"
                                ? "Verify Your Email Address"
                                : "Reset Your Password"
                        }
                    </h2>
                    <p style="font-size: 16px; color: #555;">Hello,</p>
                    <p style="font-size: 16px; color: #555;">
                        ${
                            emailType === "VERIFY"
                                ? "Thank you for signing up! Please confirm your email address by clicking the button below."
                                : "We received a request to reset your password. Click the button below to proceed."
                        }
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${
                            process.env.DOMAIN
                        }/verifyemail?token=${hashedToken}" 
                            style="background-color: #007bff; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
                            ${
                                emailType === "VERIFY"
                                    ? "Verify Email"
                                    : "Reset Password"
                            }
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #555;">
                        If the button above does not work, please copy and paste the following link into your browser:
                    </p>
                    <p style="word-break: break-all; font-size: 14px; color: #007bff;">
                        <a href="${
                            process.env.DOMAIN
                        }/verifyemail?token=${hashedToken}" style="color: #007bff;">
                            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                        </a>
                    </p>
                    <p style="font-size: 14px; color: #777;">
                        ${
                            emailType === "VERIFY"
                                ? "If you did not sign up for this account, please ignore this email."
                                : "If you did not request a password reset, you can safely ignore this email."
                        }
                    </p>
                    <p style="font-size: 14px; color: #777;">Best regards,</p>
                    <p style="font-size: 14px; font-weight: bold; color: #333;">Your Company Name</p>
                </div>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred while sending email.");
    }
};
