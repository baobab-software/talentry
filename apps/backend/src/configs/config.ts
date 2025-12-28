import { IConfig } from "@/interfaces";

const {
  API_SECRET_KEY,
  ADMIN_ACCESS_KEY,
  COMPANY_ACCESS_KEY,
  SEEKER_ACCESS_KEY,
  ADMIN_REFRESH_ACCESS_KEY,
  COMPANY_REFRESH_ACCESS_KEY,
  SEEKER_REFRESH_ACCESS_KEY,

  ADMIN_ARGON2_PEPPER,
  COMPANY_ARGON2_PEPPER,
  SEEKER_ARGON2_PEPPER,

  ADMIN_PASSWORD_RESET,
  ADMIN_PASSWORD_SETUP,
  COMPANY_PASSWORD_RESET,
  COMPANY_PASSWORD_SETUP,
  SEEKER_PASSWORD_RESET,
  SEEKER_PASSWORD_SETUP,

  // Redis Configuration
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,

  // Logging
  LOGTAIL_ACCESS_TOKEN,

  // Email Configuration
  NODEMAILER_HOST,
  NODEMAILER_PASSWORD,
  NODEMAILER_PORT,
  NODEMAILER_SERVICE,
  NODEMAILER_USERNAME,

  // Email Branding
  MAILGEN_PRODUCT_COPYRIGHT,
  MAILGEN_PRODUCT_LINK,
  MAILGEN_PRODUCT_LOGO,
  MAILGEN_PRODUCT_NAME,
  MAILGEN_PRODUCT_THEME,

  // Frontend URLs
  ADMIN_FRONTEND,
  SEEKER_FRONTEND,
  COMPANY_FRONTEND,
} = process.env;

/**
 * Application configuration object.
 * @type {IConfig}
 */
export const config = {
  authentication: {
    api: {
      secret: API_SECRET_KEY,
    },
    argon: {
      admin: {
        pepper: ADMIN_ARGON2_PEPPER,
      },
      company: {
        pepper: COMPANY_ARGON2_PEPPER,
      },
      seeker: {
        pepper: SEEKER_ARGON2_PEPPER,
      },
    },
    jwt: {
      // Default secret (fallback)
      secret: process.env.JWT_SECRET || "your-default-secret-key",

      // Admin role JWT config
      admin: {
        accessTokenSecret:
          process.env.JWT_ADMIN_ACCESS_SECRET ||
          process.env.JWT_SECRET ||
          "admin-access-secret",
        accessTokenExpiration:
          process.env.JWT_ADMIN_ACCESS_EXPIRATION || "15m",
        refreshTokenSecret:
          process.env.JWT_ADMIN_REFRESH_SECRET ||
          process.env.JWT_SECRET ||
          "admin-refresh-secret",
        refreshTokenExpiration:
          process.env.JWT_ADMIN_REFRESH_EXPIRATION || "7d",
        passwordResetTokenSecret:
          process.env.JWT_ADMIN_PASSWORD_RESET_SECRET ||
          process.env.JWT_SECRET ||
          "admin-password-reset-secret",
        passwordResetTokenExpiration:
          process.env.JWT_ADMIN_PASSWORD_RESET_EXPIRATION || "15m",
      },

      // Seeker role JWT config
      seeker: {
        accessTokenSecret:
          process.env.JWT_SEEKER_ACCESS_SECRET ||
          process.env.JWT_SECRET ||
          "seeker-access-secret",
        accessTokenExpiration:
          process.env.JWT_SEEKER_ACCESS_EXPIRATION || "15m",
        refreshTokenSecret:
          process.env.JWT_SEEKER_REFRESH_SECRET ||
          process.env.JWT_SECRET ||
          "seeker-refresh-secret",
        refreshTokenExpiration:
          process.env.JWT_SEEKER_REFRESH_EXPIRATION || "7d",
        passwordResetTokenSecret:
          process.env.JWT_SEEKER_PASSWORD_RESET_SECRET ||
          process.env.JWT_SECRET ||
          "seeker-password-reset-secret",
        passwordResetTokenExpiration:
          process.env.JWT_SEEKER_PASSWORD_RESET_EXPIRATION || "15m",
      },

      // Company role JWT config
      company: {
        accessTokenSecret:
          process.env.JWT_COMPANY_ACCESS_SECRET ||
          process.env.JWT_SECRET ||
          "company-access-secret",
        accessTokenExpiration:
          process.env.JWT_COMPANY_ACCESS_EXPIRATION || "15m",
        refreshTokenSecret:
          process.env.JWT_COMPANY_REFRESH_SECRET ||
          process.env.JWT_SECRET ||
          "company-refresh-secret",
        refreshTokenExpiration:
          process.env.JWT_COMPANY_REFRESH_EXPIRATION || "7d",
        passwordResetTokenSecret:
          process.env.JWT_COMPANY_PASSWORD_RESET_SECRET ||
          process.env.JWT_SECRET ||
          "company-password-reset-secret",
        passwordResetTokenExpiration:
          process.env.JWT_COMPANY_PASSWORD_RESET_EXPIRATION || "15m",
      },
    },
  },
  database: {
    redis: {
      host: REDIS_HOST,
      port: REDIS_PORT ? parseInt(REDIS_PORT, 10) : 6379,
      password: REDIS_PASSWORD,
    },
  },
  frontend: {
    admin: ADMIN_FRONTEND,
    seeker: SEEKER_FRONTEND,
    company: COMPANY_FRONTEND,
  },
  logger: {
    logtail: {
      accessToken: LOGTAIL_ACCESS_TOKEN,
    },
  },
  notification: {
    mailgen: {
      theme: MAILGEN_PRODUCT_THEME,
      product: {
        name: MAILGEN_PRODUCT_NAME,
        link: MAILGEN_PRODUCT_LINK,
        logo: MAILGEN_PRODUCT_LOGO,
        copyright: MAILGEN_PRODUCT_COPYRIGHT,
      },
    },
    nodemailer: {
      service: NODEMAILER_SERVICE,
      host: NODEMAILER_HOST,
      port: NODEMAILER_PORT ? parseInt(NODEMAILER_PORT) : undefined,
      secure: true,
      auth: {
        user: NODEMAILER_USERNAME,
        pass: NODEMAILER_PASSWORD,
      },
    },
  },
};
