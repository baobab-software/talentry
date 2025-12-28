import { config } from "@/configs/config";
import { notificationLib } from "@/libs";

interface PasswordUpdateEmailParams {
  email: string;
  firstName?: string;
  appName?: string;
  device?: {
    browser: string;
    os: string;
    location: string;
    timestamp: string;
    ip: string;
  };
}

const companyName = config.notification.mailgen.product.name;

export const passwordUpdateTemplate = ({
  email,
  firstName,
  device,
}: PasswordUpdateEmailParams) => {
  const mailGenerator = notificationLib.getMailgenInstance("default");

  const deviceInfo = device
    ? [
        {
          Item: "Browser",
          Value: device.browser,
        },
        {
          Item: "Operating System",
          Value: device.os,
        },
        {
          Item: "Location",
          Value: device.location,
        },
        {
          Item: "IP Address",
          Value: device.ip,
        },
        {
          Item: "Time",
          Value: device.timestamp,
        },
      ]
    : [];

  const emailContent = {
    body: {
      name: firstName || email,
      intro: "Your password has been successfully changed.",
      ...(deviceInfo.length > 0 && {
        table: {
          data: deviceInfo,
          columns: {
            customWidth: {
              Item: "30%",
              Value: "70%",
            },
          },
        },
      }),
      outro: [
        "If you did not make this change, please contact our support team immediately and secure your account.",
        "For your security, we recommend using a strong, unique password.",
        `Best regards,<br/>${companyName} Team`,
      ],
    },
  };

  return {
    to: email,
    subject: `Your ${companyName} password was changed`,
    html: mailGenerator.generate(emailContent),
    text: mailGenerator.generatePlaintext(emailContent),
  };
};
