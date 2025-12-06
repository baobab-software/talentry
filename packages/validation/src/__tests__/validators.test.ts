import { createValidator, validateOrThrow } from '../validators';
import { loginSchema } from '../schemas/auth';

describe('Validator Helpers', () => {
  describe('createValidator', () => {
    it('should return success for valid data', () => {
      const validator = createValidator(loginSchema);
      const result = validator({
        email: 'test@example.com',
        password: 'MyP@ssw0rd123',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
      }
    });

    it('should return errors for invalid data', () => {
      const validator = createValidator(loginSchema);
      const result = validator({
        email: 'invalid',
        password: 'short',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0]).toHaveProperty('path');
        expect(result.errors[0]).toHaveProperty('message');
      }
    });
  });

  describe('validateOrThrow', () => {
    it('should return parsed data for valid input', () => {
      const data = validateOrThrow(loginSchema, {
        email: 'test@example.com',
        password: 'MyP@ssw0rd123',
      });

      expect(data.email).toBe('test@example.com');
    });

    it('should throw error for invalid input', () => {
      expect(() =>
        validateOrThrow(loginSchema, {
          email: 'invalid',
          password: 'short',
        })
      ).toThrow();
    });
  });
});
