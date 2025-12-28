import { Job } from "bull";
import { logger } from "@/libs";
import { notificationUtil } from "@/utils";
import { authenticationQueue } from "../authentication.queue";
import { IEmailJob } from "@/interfaces";
import {
  welcomeTemplate,
  accountVerificationOtpTemplate,
  passwordResetTemplate,
  passwordUpdateTemplate,
} from "@/templates/authentication";

const TEMPLATE_NAMES = {
  WELCOME: "welcome",
  ACCOUNT_VERIFICATION_OTP: "account_verification_otp",
  PASSWORD_RESET: "password_reset",
  PASSWORD_RESET_OTP: "password_reset_otp",
  PASSWORD_UPDATE: "password_update",
} as const;

type TemplateName = (typeof TEMPLATE_NAMES)[keyof typeof TEMPLATE_NAMES];

/**
 * Generates email content using the appropriate template function
 */
const generateEmailContent = (
  templateName: TemplateName,
  content: Record<string, unknown>
): { to: string; subject: string; html: string; text: string } => {
  switch (templateName) {
    case TEMPLATE_NAMES.WELCOME:
      return welcomeTemplate(
        content as unknown as Parameters<typeof welcomeTemplate>[0]
      );

    case TEMPLATE_NAMES.ACCOUNT_VERIFICATION_OTP:
      return accountVerificationOtpTemplate(
        content as unknown as Parameters<
          typeof accountVerificationOtpTemplate
        >[0]
      );

    case TEMPLATE_NAMES.PASSWORD_RESET:
    case TEMPLATE_NAMES.PASSWORD_RESET_OTP:
      return passwordResetTemplate(
        content as unknown as Parameters<typeof passwordResetTemplate>[0]
      );

    case TEMPLATE_NAMES.PASSWORD_UPDATE:
      return passwordUpdateTemplate(
        content as unknown as Parameters<typeof passwordUpdateTemplate>[0]
      );

    default:
      const availableTemplates = Object.values(TEMPLATE_NAMES).join(", ");
      throw new Error(
        `Unknown template: ${templateName}. Available templates: ${availableTemplates}`
      );
  }
};

/**
 * Validates if a string is a valid template name
 */
const isValidTemplateName = (name: string): name is TemplateName => {
  return Object.values(TEMPLATE_NAMES).includes(name as TemplateName);
};

authenticationQueue.process(async (job: Job<IEmailJob>) => {
  try {
    const { email, template } = job.data;

    logger.info("Processing email job", {
      jobId: job.id,
      email,
      templateName: template?.name,
    });

    if (!email) {
      throw new Error("Email address is required");
    }

    if (!template || !template.name) {
      throw new Error("Template name is required");
    }

    if (!template.content) {
      throw new Error("Template content is required");
    }

    if (!isValidTemplateName(template.name)) {
      const availableTemplates = Object.values(TEMPLATE_NAMES).join(", ");
      throw new Error(
        `Unknown template: ${template.name}. Available templates: ${availableTemplates}`
      );
    }

    let emailContent: {
      to: string;
      subject: string;
      html: string;
      text: string;
    };

    try {
      emailContent = generateEmailContent(template.name, {
        ...template.content,
        email,
      });

      if (!emailContent.html || emailContent.html.trim().length === 0) {
        throw new Error(`Template '${template.name}' rendered empty content`);
      }

      logger.info("Template rendered successfully", {
        jobId: job.id,
        templateName: template.name,
        contentLength: emailContent.html.length,
      });
    } catch (templateError) {
      logger.error("Template rendering failed", {
        jobId: job.id,
        templateName: template.name,
        templateContent: JSON.stringify(template.content),
        error:
          templateError instanceof Error
            ? templateError.message
            : String(templateError),
        stack: templateError instanceof Error ? templateError.stack : undefined,
      });
      throw new Error(
        `Failed to render template '${template.name}': ${
          templateError instanceof Error
            ? templateError.message
            : String(templateError)
        }`
      );
    }

    try {
      await notificationUtil.sendEmail(
        emailContent.to,
        emailContent.subject,
        emailContent.html
      );

      logger.info("Email sent successfully", {
        jobId: job.id,
        email: emailContent.to,
        subject: emailContent.subject,
      });
    } catch (emailError) {
      logger.error("Email sending failed", {
        jobId: job.id,
        email: emailContent.to,
        subject: emailContent.subject,
        error:
          emailError instanceof Error ? emailError.message : String(emailError),
      });
      throw new Error(
        `Failed to send email: ${
          emailError instanceof Error ? emailError.message : String(emailError)
        }`
      );
    }
  } catch (error) {
    logger.error("Failed to process job", {
      jobId: job.id,
      email: job.data.email,
      subject: job.data.subject,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
});

authenticationQueue.on("completed", (job) => {
  logger.info("Job completed successfully", {
    jobId: job.id,
    email: job.data.email,
    templateName: job.data.template?.name,
  });
});

authenticationQueue.on("failed", (job, err) => {
  logger.error("Job failed", {
    jobId: job.id,
    error: err.message,
    data: job.data,
  });
});
