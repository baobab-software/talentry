import { config } from "@/configs/config";
import { notificationLib } from "@/libs";

interface WelcomeEmailParams {
  email: string;
  firstName?: string;
}

const companyName = config.notification.mailgen.product.name;

export const welcomeTemplate = ({ email, firstName }: WelcomeEmailParams) => {
  const mailGenerator = notificationLib.getMailgenInstance("default");

  const emailContent = {
    body: {
      name: firstName || email,
      intro: `Welcome to ${companyName}! We're excited to have you on board.`,
      action: {
        instructions: `To get started with ${companyName}, please click the button below:`,
        button: {
          color: "#22BC66",
          text: "Get Started",
          link: "#",
        },
      },
      outro: [
        "Need help, or have questions? Just reply to this email, we'd love to help.",
        `Best regards,<br/>${companyName} Team`,
      ],
    },
  };

  return {
    to: email,
    subject: `Welcome to ${companyName}!`,
    html: mailGenerator.generate(emailContent),
    text: mailGenerator.generatePlaintext(emailContent),
  };
};
