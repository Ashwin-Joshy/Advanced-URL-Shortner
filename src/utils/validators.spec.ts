import { validateLoginInput, validateSignupInput } from './validators';  // Adjust the import path as necessary

describe('Validation Functions', () => {
  
  describe('validateLoginInput', () => {
    it('should return an error if email is missing', () => {
      const result = validateLoginInput({ email: '', password: 'password123' });
      expect(result.error).toContain('Email is required.');
    });

    it('should return an error if email is invalid', () => {
      const result = validateLoginInput({ email: 'invalidemail', password: 'password123' });
      expect(result.error).toContain('Email must be a valid email address.');
    });

    it('should return an error if password is missing', () => {
      const result = validateLoginInput({ email: 'test@example.com', password: '' });
      expect(result.error).toContain('Password is required.');
    });

    it('should return an error if password is too short', () => {
      const result = validateLoginInput({ email: 'test@example.com', password: 'short' });
      expect(result.error).toContain('Password must be at least 6 characters long.');
    });

    it('should return an error if password is too long', () => {
      const result = validateLoginInput({ email: 'test@example.com', password: 'a'.repeat(129) });
      expect(result.error).toContain('Password cannot exceed 128 characters.');
    });

    it('should return no errors if input is valid', () => {
      const result = validateLoginInput({ email: 'test@example.com', password: 'password123' });
      expect(result.error).toBeUndefined();
    });
  });

  describe('validateSignupInput', () => {
    it('should return an error if username is missing or too short', () => {
      const result = validateSignupInput({ username: '', email: 'test@example.com', password: 'password123' });
      expect(result.error).toContain('Username must be at least 3 characters long.');

      const result2 = validateSignupInput({ username: 'ab', email: 'test@example.com', password: 'password123' });
      expect(result2.error).toContain('Username must be at least 3 characters long.');
    });

    it('should return an error if email is missing', () => {
      const result = validateSignupInput({ username: 'user123', email: '', password: 'password123' });
      expect(result.error).toContain('Email is required.');
    });

    it('should return an error if email is invalid', () => {
      const result = validateSignupInput({ username: 'user123', email: 'invalidemail', password: 'password123' });
      expect(result.error).toContain('Email must be a valid email address.');
    });

    it('should return an error if password is missing', () => {
      const result = validateSignupInput({ username: 'user123', email: 'test@example.com', password: '' });
      expect(result.error).toContain('Password is required.');
    });

    it('should return an error if password is too short', () => {
      const result = validateSignupInput({ username: 'user123', email: 'test@example.com', password: 'short' });
      expect(result.error).toContain('Password must be at least 6 characters long.');
    });

    it('should return no errors if input is valid', () => {
      const result = validateSignupInput({ username: 'user123', email: 'test@example.com', password: 'password123' });
      expect(result.error).toBeUndefined();
    });
  });

});
