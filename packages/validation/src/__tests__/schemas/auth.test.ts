import {
  loginSchema,
  candidateRegisterSchema,
  employerRegisterSchema,
  adminRegisterSchema,
} from "../../schemas/auth";

describe("Auth Schemas", () => {
  describe("loginSchema", () => {
    it("should accept valid login credentials", () => {
      const validLogin = {
        email: "test@example.com",
        password: "MyP@ssw0rd123",
      };

      expect(() => loginSchema.parse(validLogin)).not.toThrow();
    });

    it("should reject login without email", () => {
      const invalidLogin = {
        password: "MyP@ssw0rd123",
      };

      expect(() => loginSchema.parse(invalidLogin)).toThrow();
    });

    it("should reject login without password", () => {
      const invalidLogin = {
        email: "test@example.com",
      };

      expect(() => loginSchema.parse(invalidLogin)).toThrow();
    });
  });

  describe("candidateRegisterSchema", () => {
    it("should accept valid candidate registration", () => {
      const validRegistration = {
        email: "candidate@example.com",
        phone: "+27123456789",
        password: "MyP@ssw0rd123",
        firstName: "John",
        lastName: "Doe",
      };

      expect(() =>
        candidateRegisterSchema.parse(validRegistration)
      ).not.toThrow();
    });

    it("should reject firstName with numbers", () => {
      const invalidRegistration = {
        email: "candidate@example.com",
        phone: "+27123456789",
        password: "MyP@ssw0rd123",
        firstName: "John123",
        lastName: "Doe",
      };

      expect(() => candidateRegisterSchema.parse(invalidRegistration)).toThrow(
        "First name can only contain letters"
      );
    });

    it("should reject lastName with special characters", () => {
      const invalidRegistration = {
        email: "candidate@example.com",
        phone: "+27123456789",
        password: "MyP@ssw0rd123",
        firstName: "John",
        lastName: "Doe-Smith",
      };

      expect(() =>
        candidateRegisterSchema.parse(invalidRegistration)
      ).toThrow();
    });
  });

  describe("employerRegisterSchema", () => {
    it("should accept valid employer registration", () => {
      const validRegistration = {
        email: "employer@example.com",
        phone: "+27123456789",
        password: "MyP@ssw0rd123",
        name: "Tech Corp",
        industry: "Technology",
      };

      expect(() =>
        employerRegisterSchema.parse(validRegistration)
      ).not.toThrow();
    });

    it("should reject registration without company name", () => {
      const invalidRegistration = {
        email: "employer@example.com",
        phone: "+27123456789",
        password: "MyP@ssw0rd123",
        industry: "Technology",
      };

      expect(() => employerRegisterSchema.parse(invalidRegistration)).toThrow();
    });
  });

  describe("adminRegisterSchema", () => {
    it("should accept valid admin registration", () => {
      const validRegistration = {
        email: "admin@example.com",
        phone: "+27123456789",
        password: "MyP@ssw0rd123",
        firstName: "Admin",
        lastName: "User",
      };

      expect(() => adminRegisterSchema.parse(validRegistration)).not.toThrow();
    });
  });
});
