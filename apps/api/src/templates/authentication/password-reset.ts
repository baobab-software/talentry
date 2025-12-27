import { config } from "@/configs/config";
import { notificationLib } from "@/libs";

interface PasswordResetEmailParams {
  email: string;
  otp: string;
  expiration: string;
  firstName?: string;
  appName?: string;
}

const companyName = config.notification.mailgen.product.name;

export const passwordResetTemplate = ({
  email,
  otp,
  expiration,
  firstName,
}: PasswordResetEmailParams) => {
  const mailGenerator = notificationLib.getMailgenInstance("default");

  const emailContent = {
    body: {
      name: firstName || email,
      intro: [
        "You have received this email because a password reset request for your account was received.",
        "Use the verification code below to reset your password.",
      ],
      table: {
        data: [
          {
            "Reset Code": otp,
          },
        ],
        columns: {
          customWidth: {
            "Reset Code": "100%",
          },
          customAlignment: {
            "Reset Code": "center",
          },
        },
      },
      action: {
        instructions: `Enter this code in the password reset screen. This code will expire in ${expiration}.`,
        button: {
          color: "#DC4D2F",
          text: "Reset Password",
          link: `${
            config.frontend.seeker
          }/auth/reset-password?email=${encodeURIComponent(email)}`,
        },
      },
      outro: [
        "If you did not request a password reset, please ignore this email or contact support if you have concerns.",
        `For security reasons, this code will expire in ${expiration}.`,
        `Best regards,<br/>${companyName} Team`,
      ],
    },
  };

  return {
    to: email,
    subject: `Reset your ${companyName} password`,
    html: mailGenerator.generate(emailContent),
    text: mailGenerator.generatePlaintext(emailContent),
  };
};
