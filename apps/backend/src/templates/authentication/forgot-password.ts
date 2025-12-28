import { config } from "@/configs/config";
import { notificationLib } from "@/libs";

interface PasswordResetEmailParams {
  email: string;
  otp: number;
  firstName?: string;
  companyName?: string;
  otpValidityMinutes?: number;
}

const companyName = config.notification.mailgen.product.name;

export const forgotPasswordTemplate = ({
  email,
  otp,
  otpValidityMinutes = 10,
}: PasswordResetEmailParams) => {
  const mailGenerator = notificationLib.getMailgenInstance("default");

  const emailContent = {
    body: {
      name: email,
      intro: `We received a request to reset your password for your ${companyName} account.`,
      action: {
        instructions: "Use the OTP below to reset your password:",
        button: {
          color: "#DC2626",
          text: otp.toString(),
          link: "#",
        },
      },
      outro: [
        `This OTP is valid for ${otpValidityMinutes} minutes.`,
        "If you did not request a password reset, please ignore this email.",
        `Best regards,<br/>${companyName} Team`,
      ],
    },
  };

  return {
    to: email,
    subject: "Password Reset Request",
    html: mailGenerator.generate(emailContent),
    text: mailGenerator.generatePlaintext(emailContent),
  };
};

// Usage:
// forgotPasswordTemplate({ email: "user@example.com", otp: 123456, firstName: "John" });
