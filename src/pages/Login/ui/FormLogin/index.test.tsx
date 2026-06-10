import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Form } from './index';
import { useUserAuth } from '../../../../hooks/auth/useUserAuth';

jest.mock('../../../../hooks/auth/useUserAuth');

const mockUseUserAuth = useUserAuth as jest.MockedFunction<typeof useUserAuth>;

const renderForm = (overrides: Partial<ReturnType<typeof useUserAuth>> = {}) => {
  const defaults = { authLogin: jest.fn(), error: null, loading: false };
  mockUseUserAuth.mockReturnValue({ ...defaults, ...overrides });
  return render(
    <MemoryRouter>
      <Form />
    </MemoryRouter>
  );
};

describe('Form component (Login)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email input, password input, and submit button', () => {
    renderForm();
    expect(screen.getByPlaceholderText('correo@ejemplo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  it('submit button is disabled when form is empty', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeDisabled();
  });

  it('shows email validation error for an invalid email', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'not-an-email');
    expect(screen.getByText(/correo electronico valido/i)).toBeInTheDocument();
  });

  it('does not show email error for a valid email', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'valid@email.com');
    expect(screen.queryByText(/correo electronico valido/i)).not.toBeInTheDocument();
  });

  it('shows password validation error when password is too short', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('********'), 'ab');
    expect(screen.getByText(/al menos/i)).toBeInTheDocument();
  });

  it('enables submit button when email and password are both valid', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'valid@email.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'validpass');
    expect(screen.getByRole('button', { name: /ingresar/i })).not.toBeDisabled();
  });

  it('calls authLogin with the correct form data on submit', async () => {
    const mockAuthLogin = jest.fn();
    renderForm({ authLogin: mockAuthLogin });

    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'user@test.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    fireEvent.submit(
      screen.getByRole('button', { name: /ingresar/i }).closest('form')!
    );

    expect(mockAuthLogin).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'password123',
    });
  });

  it('shows the Loading component while loading is true', () => {
    renderForm({ loading: true });
    expect(document.querySelector('.container-loading')).toBeInTheDocument();
  });

  it('hides the Loading component when loading is false', () => {
    renderForm({ loading: false });
    expect(document.querySelector('.container-loading')).not.toBeInTheDocument();
  });

  it('displays the error message returned by the hook', () => {
    renderForm({ error: 'Login falhou' });
    expect(screen.getByText('Login falhou')).toBeInTheDocument();
  });

  it('does not call authLogin when loading is true', async () => {
    const mockAuthLogin = jest.fn();
    renderForm({ authLogin: mockAuthLogin, loading: true });

    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'user@test.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    fireEvent.submit(
      screen.getByRole('button', { name: /ingresar/i }).closest('form')!
    );

    expect(mockAuthLogin).not.toHaveBeenCalled();
  });

  it('does not call authLogin when email is invalid', async () => {
    const mockAuthLogin = jest.fn();
    renderForm({ authLogin: mockAuthLogin });

    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'bad-email');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    fireEvent.submit(
      screen.getByRole('button', { name: /ingresar/i }).closest('form')!
    );

    expect(mockAuthLogin).not.toHaveBeenCalled();
  });

  it('does not call authLogin when password is too short', async () => {
    const mockAuthLogin = jest.fn();
    renderForm({ authLogin: mockAuthLogin });

    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'valid@email.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'ab');
    fireEvent.submit(
      screen.getByRole('button', { name: /ingresar/i }).closest('form')!
    );

    expect(mockAuthLogin).not.toHaveBeenCalled();
  });
});
