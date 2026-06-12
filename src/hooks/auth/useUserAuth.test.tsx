import { renderHook, act } from '@testing-library/react';
import { useUserAuth } from './useUserAuth';
import { authService } from '../../services/auth/service-auth';
import { useAuth } from '../../context/AuthUserContext';
import toast from 'react-hot-toast';

jest.mock('../../services/auth/service-auth', () => ({
  authService: { login: jest.fn() },
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../context/AuthUserContext');

const mockAuthServiceLogin = authService.login as jest.Mock;
const mockContextLogin = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  (useAuth as jest.Mock).mockReturnValue({ login: mockContextLogin });
});

describe('useUserAuth', () => {
  it('initializes with loading false and error null', () => {
    const { result } = renderHook(() => useUserAuth());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets loading to true while the request is in flight', async () => {
    let resolveLogin!: (v: any) => void;
    mockAuthServiceLogin.mockReturnValue(
      new Promise((res) => { resolveLogin = res; })
    );

    const { result } = renderHook(() => useUserAuth());

    act(() => {
      result.current.authLogin({ email: 'a@b.com', password: '123456' });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveLogin({ token: 'tok', user: { id: 1, name: 'X', email: 'a@b.com' } });
    });
  });

  it('saves token to localStorage and calls context login on success', async () => {
    const user = { id: 1, name: 'Ana', email: 'ana@test.com' };
    mockAuthServiceLogin.mockResolvedValue({ token: 'jwt-token', user });

    const { result } = renderHook(() => useUserAuth());

    await act(async () => {
      await result.current.authLogin({ email: 'ana@test.com', password: 'pass123' });
    });

    expect(localStorage.getItem('bancoxyz_token')).toBe('jwt-token');
    expect(mockContextLogin).toHaveBeenCalledWith(user);
    expect(toast.success).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error state and calls toast.error on failure', async () => {
    const error = { response: { data: { message: 'Credenciais invalidas' } } };
    mockAuthServiceLogin.mockRejectedValue(error);

    const { result } = renderHook(() => useUserAuth());

    await act(async () => {
      await result.current.authLogin({ email: 'bad@bad.com', password: 'wrong' });
    });

    expect(result.current.error).toBe('Credenciais invalidas');
    expect(toast.error).toHaveBeenCalledWith('Credenciais invalidas');
    expect(result.current.loading).toBe(false);
  });

  it('uses fallback message when error response has no message', async () => {
    mockAuthServiceLogin.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useUserAuth());

    await act(async () => {
      await result.current.authLogin({ email: 'bad@bad.com', password: 'wrong' });
    });

    expect(result.current.error).toBe('Login falhou');
    expect(toast.error).toHaveBeenCalledWith('Login falhou');
  });

  it('clears a previous error before a new login attempt', async () => {
    const user = { id: 1, name: 'X', email: 'x@x.com' };
    mockAuthServiceLogin
      .mockRejectedValueOnce({ response: { data: { message: 'Error 1' } } })
      .mockResolvedValueOnce({ token: 'tok', user });

    const { result } = renderHook(() => useUserAuth());

    await act(async () => {
      await result.current.authLogin({ email: 'x@x.com', password: 'wrong' });
    });
    expect(result.current.error).toBe('Error 1');

    await act(async () => {
      await result.current.authLogin({ email: 'x@x.com', password: 'correct' });
    });
    expect(result.current.error).toBeNull();
  });
});
