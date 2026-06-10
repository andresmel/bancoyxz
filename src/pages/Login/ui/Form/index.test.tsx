import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Form } from './index';
import { AuthProvider } from '../../../../context/AuthUserContext';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const renderForm = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Form />
      </AuthProvider>
    </MemoryRouter>
  );

describe('Form component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with email input, password input, and submit button', () => {
    renderForm();
    expect(screen.getByPlaceholderText('correo@ejemplo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  it('submit button is disabled when form is empty', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeDisabled();
  });

  it('shows email validation error for invalid email format', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'invalidemail');
    expect(screen.getByText(/ingrese un correo electronico valido/i)).toBeInTheDocument();
  });

  it('does not show email error for a valid email', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'valid@example.com');
    expect(screen.queryByText(/ingrese un correo electronico valido/i)).not.toBeInTheDocument();
  });

  it('shows password validation error when password has fewer than 6 characters', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('********'), 'abc');
    expect(screen.getByText(/la contrasena debe tener al menos 6 caracteres/i)).toBeInTheDocument();
  });

  it('does not show password error when password is 6 or more characters', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('********'), 'validpassword');
    expect(screen.queryByText(/la contrasena debe tener al menos 6 caracteres/i)).not.toBeInTheDocument();
  });

  it('enables submit button when both email and password are valid', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'valid@example.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    expect(screen.getByRole('button', { name: /ingresar/i })).not.toBeDisabled();
  });

  it('shows loading component while login request is in flight', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'johndoe@example.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    expect(document.querySelector('.container-loading')).toBeInTheDocument();
  });

  it('hides loading component after login request completes', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'johndoe@example.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    act(() => { jest.runAllTimers(); });
    await waitFor(() => {
      expect(document.querySelector('.container-loading')).not.toBeInTheDocument();
    });
  });

  it('shows error message when invalid credentials are submitted', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'wrong@example.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    act(() => { jest.runAllTimers(); });
    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  it('navigates to onboarding on successful login by authenticating user in context', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'johndoe@example.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    act(() => { jest.runAllTimers(); });
    await waitFor(() => {
      const savedUser = localStorage.getItem('bancoxyz_user');
      expect(savedUser).not.toBeNull();
      expect(JSON.parse(savedUser!).email).toBe('johndoe@example.com');
    });
  });

  it('does not submit form if already loading', async () => {
    renderForm();
    await userEvent.type(screen.getByPlaceholderText('correo@ejemplo.com'), 'johndoe@example.com');
    await userEvent.type(screen.getByPlaceholderText('********'), 'password123');
    const button = screen.getByRole('button', { name: /ingresar/i });
    await userEvent.click(button);
    expect(button).toBeDisabled();
  });
});
