import { authService } from './service-auth';

describe('authService', () => {
  describe('login', () => {
    it('returns user with valid credentials', () => {
      const { login } = authService();
      const user = login({ email: 'johndoe@example.com', password: 'password123' });
      expect(user).toBeDefined();
      expect(user.email).toBe('johndoe@example.com');
      expect(user.name).toBe('John Doe');
    });

    it('returns correct user when multiple users exist', () => {
      const { login } = authService();
      const user = login({ email: 'janesmith@example.com', password: 'password456' });
      expect(user.email).toBe('janesmith@example.com');
    });

    it('throws error with invalid email', () => {
      const { login } = authService();
      expect(() =>
        login({ email: 'notexist@example.com', password: 'password123' })
      ).toThrow('Invalid email or password');
    });

    it('throws error with wrong password for valid email', () => {
      const { login } = authService();
      expect(() =>
        login({ email: 'johndoe@example.com', password: 'wrongpassword' })
      ).toThrow('Invalid email or password');
    });

    it('throws error when both email and password are invalid', () => {
      const { login } = authService();
      expect(() =>
        login({ email: 'nobody@example.com', password: 'notapassword' })
      ).toThrow('Invalid email or password');
    });

    it('throws error with correct email but empty password', () => {
      const { login } = authService();
      expect(() =>
        login({ email: 'johndoe@example.com', password: '' })
      ).toThrow('Invalid email or password');
    });
  });
});
