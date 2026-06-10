import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthUserContext';
import type { User } from '../data/repository';

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  password: 'password123',
  photo: 'https://example.com/photo.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TestConsumer = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="is-auth">{isAuthenticated ? 'yes' : 'no'}</span>
      <span data-testid="user-name">{user?.name ?? 'none'}</span>
      <button onClick={() => login(mockUser)}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthUserContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders children', () => {
    render(<AuthProvider><span>child content</span></AuthProvider>);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('initial state is not authenticated when localStorage is empty', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('is-auth')).toHaveTextContent('no');
    expect(screen.getByTestId('user-name')).toHaveTextContent('none');
  });

  it('login updates user and sets isAuthenticated to true', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    act(() => { screen.getByText('Login').click(); });
    expect(screen.getByTestId('is-auth')).toHaveTextContent('yes');
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
  });

  it('login persists user to localStorage', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    act(() => { screen.getByText('Login').click(); });
    const saved = localStorage.getItem('bancoxyz_user');
    expect(saved).not.toBeNull();
    expect(JSON.parse(saved!).name).toBe('John Doe');
  });

  it('logout clears user and removes from localStorage', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    act(() => { screen.getByText('Login').click(); });
    act(() => { screen.getByText('Logout').click(); });
    expect(screen.getByTestId('is-auth')).toHaveTextContent('no');
    expect(screen.getByTestId('user-name')).toHaveTextContent('none');
    expect(localStorage.getItem('bancoxyz_user')).toBeNull();
  });

  it('reads persisted user from localStorage on mount', () => {
    localStorage.setItem('bancoxyz_user', JSON.stringify(mockUser));
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('is-auth')).toHaveTextContent('yes');
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
  });

  it('useAuth throws when used outside AuthProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const Broken = () => { useAuth(); return null; };
    expect(() => render(<Broken />)).toThrow('useAuth must be used within AuthProvider');
    spy.mockRestore();
  });
});
