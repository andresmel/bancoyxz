import { renderHook, act } from '@testing-library/react';
import { useUserAuth } from './useUserAuth';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../services/auth/service-auth', () => ({
  authService: jest.fn(),
}));

jest.mock('../../context/AuthUserContext', () => ({
  useAuth: jest.fn(),
}));

import toast from 'react-hot-toast';
import { authService } from '../../services/auth/service-auth';
import { useAuth } from '../../context/AuthUserContext';

const mockLogin = jest.fn();
const mockServiceLogin = jest.fn();

describe('useUserAuth', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (authService as jest.Mock).mockReturnValue({ login: mockServiceLogin });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('has correct initial state', () => {
    const { result } = renderHook(() => useUserAuth());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets loading to true immediately after authLogin is called', () => {
    const { result } = renderHook(() => useUserAuth());
    act(() => { result.current.authLogin({ email: 'test@test.com', password: 'pass123' }); });
    expect(result.current.loading).toBe(true);
  });

  it('calls context login and toast.success on valid credentials', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    mockServiceLogin.mockReturnValue(mockUser);

    const { result } = renderHook(() => useUserAuth());
    act(() => { result.current.authLogin({ email: 'johndoe@example.com', password: 'password123' }); });
    act(() => { jest.runAllTimers(); });

    expect(mockLogin).toHaveBeenCalledWith(mockUser);
    expect(toast.success).toHaveBeenCalledWith('Login successful');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error and calls toast.error on invalid credentials', () => {
    mockServiceLogin.mockImplementation(() => {
      throw new Error('Invalid email or password');
    });

    const { result } = renderHook(() => useUserAuth());
    act(() => { result.current.authLogin({ email: 'bad@email.com', password: 'wrongpass' }); });
    act(() => { jest.runAllTimers(); });

    expect(result.current.error).toBe('Invalid email or password');
    expect(toast.error).toHaveBeenCalledWith('Invalid email or password');
    expect(result.current.loading).toBe(false);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('resets loading to false after timeout resolves', () => {
    mockServiceLogin.mockReturnValue({ id: 1 });

    const { result } = renderHook(() => useUserAuth());
    act(() => { result.current.authLogin({ email: 'x@x.com', password: 'password' }); });
    expect(result.current.loading).toBe(true);
    act(() => { jest.runAllTimers(); });
    expect(result.current.loading).toBe(false);
  });

  it('clears previous error on new authLogin call', () => {
    mockServiceLogin
      .mockImplementationOnce(() => { throw new Error('Invalid email or password'); })
      .mockReturnValueOnce({ id: 1, name: 'John' });

    const { result } = renderHook(() => useUserAuth());

    act(() => { result.current.authLogin({ email: 'bad@email.com', password: 'wrong' }); });
    act(() => { jest.runAllTimers(); });
    expect(result.current.error).toBe('Invalid email or password');

    act(() => { result.current.authLogin({ email: 'johndoe@example.com', password: 'password123' }); });
    expect(result.current.error).toBeNull();
  });
});
