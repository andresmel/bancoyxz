import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthUserContext';

beforeEach(() => {
  localStorage.clear();
});

describe('AuthProvider', () => {
  it('provides null user and isAuthenticated false by default', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('login sets user and persists to localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const user = { id: 1, name: 'Ana', email: 'ana@test.com' };

    act(() => { result.current.login(user); });

    expect(result.current.user).toEqual(user);
    expect(result.current.isAuthenticated).toBe(true);
    expect(JSON.parse(localStorage.getItem('bancoxyz_user')!)).toEqual(user);
  });

  it('logout clears user and localStorage entries', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const user = { id: 1, name: 'Ana', email: 'ana@test.com' };

    act(() => { result.current.login(user); });
    act(() => { result.current.logout(); });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('bancoxyz_user')).toBeNull();
    expect(localStorage.getItem('bancoxyz_token')).toBeNull();
  });

  it('restores user from localStorage on initialization', () => {
    const user = { id: 2, name: 'Bob', email: 'bob@test.com' };
    localStorage.setItem('bancoxyz_user', JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.user).toEqual(user);
    expect(result.current.isAuthenticated).toBe(true);
  });
});

describe('useAuth', () => {
  it('throws when used outside AuthProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within AuthProvider');
    spy.mockRestore();
  });
});
