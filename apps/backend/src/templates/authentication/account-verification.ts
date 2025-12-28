import { config } from "@/configs/config";
import { notificationLib } from "@/libs";

interface AccountVerificationEmailParams {
  email: string;
  otp: string;
  expiration: string;
  firstName?: string;
  appName?: string;
  role?: string;
}

const companyName = config.notification.mailgen.product.name;

export const accountVerificationOtpTemplate = ({
  email,
  otp,
  expiration,
  firstName,
  role,
}: AccountVerificationEmailParams) => {
  const mailGenerator = notificationLib.getMailgenInstance("default");

  const roleDisplay = role
    ? role.charAt(0) + role.slice(1).toLowerCase()
    : "User";

  const emailContent = {
    body: {
      name: firstName || email,
      intro: [
        `Welcome to ${companyName}!`,
        `You're registering as a ${roleDisplay}. Please use the verification code below to complete your account setup.`,
      ],
      table: {
        data: [
          {
            "Verification Code": otp,
          },
        ],
        columns: {
          customWidth: {
            "Verification Code": "100%",
          },
          customAlignment: {
            "Verification Code": "center",
          },
        },
      },
      action: {
        instructions: `Enter this code in the verification screen to activate your account. This code will expire in ${expiration}.`,
        button: {
          color: "#22BC66",
          text: "Verify Account",
          link: `${
            config.frontend[role.toLowerCase()]
          }/auth/verify?email=${encodeURIComponent(email)}`,
        },
      },
      outro: [
        "If you did not create an account, please ignore this email.",
        `For security reasons, this code will expire in ${expiration}.`,
        "Need help? Just reply to this email, we'd love to help.",
      ],
    },
  };

  return {
    to: email,
    subject: `Verify your ${companyName} account`,
    html: mailGenerator.generate(emailContent),
    text: mailGenerator.generatePlaintext(emailContent),
  };
};
