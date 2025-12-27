/**
 * Interface representing the configuration settings.
 */
export interface IConfig {
  /**
   * Authentication configuration settings.
   */
  authentication: {
    api: {
      secret: string;
    };
    argon: {
      admin: {
        pepper: string;
      };
      company: {
        pepper: string;
      };
      seeker: {
        pepper: string;
      };
    };
    jwt: {
      admin: {
        access: string;
        refresh: string;
        password_setup: string;
        password_reset: string;
      };
      company: {
        access: string;
        refresh: string;
        password_setup: string;
        password_reset: string;
      };
      seeker: {
        access: string;
        refresh: string;
        password_setup: string;
        password_reset: string;
      };
    };
  };
  /**
   * Database configuration settings.
   */
  database: {
    redis: {
      /** The host address of the Redis instance */
      host: string;
      /** The port number of the Redis instance */
      port: number;
      /** The password for accessing the Redis instance */
      password: string;
    };
  };
  /**
   * Frontend configuration settings.
   */
  frontend: {
    admin: string;
    seeker: string;
    company: string;
  };
  /**
   * Logger configuration settings.
   */
  logger: {
    logtail: {
      /**
       * The Logtail access token.
       */
      accessToken: string;
    };
  };
  /**
   * Notification configuration settings.
   */
  notification: {
    mailgen: {
      theme: string;
      product: {
        name: string;
        link: string;
        logo: string;
        copyright: string;
      };
    };
    nodemailer: {
      service: string;
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  };
}
