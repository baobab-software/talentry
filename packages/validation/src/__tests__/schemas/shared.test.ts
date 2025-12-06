import { emailSchema, passwordSchema, phoneSchema } from '../../schemas/shared';

describe('Primitive Schemas', () => {
  describe('emailSchema', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'first+last@test.org',
      ];

      validEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).not.toThrow();
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        '',
      ];

      invalidEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).toThrow();
      });
    });

    it('should reject blocked email domains', () => {
      const blockedEmails = [
        'test@protonmail.com',
        'user@pront.me',
        'admin@tutanota.io',
      ];

      blockedEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).toThrow(
          'We currently do not accept emails from that provider.'
        );
      });
    });

    it('should trim and lowercase email addresses', () => {
      const result = emailSchema.parse('  TEST@EXAMPLE.COM  ');
      expect(result).toBe('test@example.com');
    });
  });

  describe('passwordSchema', () => {
    it('should accept valid strong passwords', () => {
      const validPasswords = [
        'MyP@ssw0rd123',
        'Str0ng!Pass12',
        'C0mpl3x@Password',
        'Test123!@#ABC',
      ];

      validPasswords.forEach((password) => {
        expect(() => passwordSchema.parse(password)).not.toThrow();
      });
    });

    it('should reject passwords without uppercase letters', () => {
      expect(() => passwordSchema.parse('myp@ssw0rd123')).toThrow();
    });

    it('should reject passwords without lowercase letters', () => {
      expect(() => passwordSchema.parse('MYP@SSW0RD123')).toThrow();
    });

    it('should reject passwords without numbers', () => {
      expect(() => passwordSchema.parse('MyP@ssword!')).toThrow();
    });

    it('should reject passwords without special characters', () => {
      expect(() => passwordSchema.parse('MyPassword123')).toThrow();
    });

    it('should reject passwords shorter than 12 characters', () => {
      expect(() => passwordSchema.parse('Sh0rt!Pass')).toThrow(
        'Password should be at least 12 characters long.'
      );
    });

    it('should reject passwords longer than 64 characters', () => {
      const longPassword = 'A'.repeat(65) + '1!a';
      expect(() => passwordSchema.parse(longPassword)).toThrow(
        'Password should not exceed 64 characters.'
      );
    });
  });

  describe('phoneSchema', () => {
    it('should accept valid international phone numbers', () => {
      const validPhones = [
        '+27123456789',
        '+1234567890',
        '+447911123456',
        '+861234567890',
      ];

      validPhones.forEach((phone) => {
        expect(() => phoneSchema.parse(phone)).not.toThrow();
      });
    });

    it('should reject phone numbers without country code', () => {
      expect(() => phoneSchema.parse('0123456789')).toThrow();
    });

    it('should reject phone numbers with invalid format', () => {
      const invalidPhones = [
        { value: '+0123456789', reason: 'Country code cannot start with 0' },
        { value: '1234567890', reason: 'Missing +' },
        { value: '+12345', reason: 'Too short' },
        { value: '+1234567890123456789', reason: 'Too long (19 digits)' },
      ];

      invalidPhones.forEach(({ value }) => {
        expect(() => phoneSchema.parse(value)).toThrow();
      });
    });
  });
});
