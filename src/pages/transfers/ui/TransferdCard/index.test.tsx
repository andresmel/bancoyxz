import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TrasferCard } from './index';
import { useProduct } from '../../../../hooks/product/useProduct';

jest.mock('../../../../hooks/product/useProduct');
jest.mock('../../../../components/loading', () => ({
  Loading: () => <div data-testid="loading-spinner" />,
}));

const mockSetTransfer = jest.fn();
const mockGetCurrency = jest.fn();

const mockCurrencies = [
  { id: 1, code: 'USD', name: 'Dólar Estadounidense' },
  { id: 2, code: 'EUR', name: 'Euro' },
];

const defaultHook = {
  setTransfer: mockSetTransfer,
  loading: false,
  error: null,
  transferMessage: null,
  getCurrency: mockGetCurrency,
};

const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

function fillForm(container: HTMLElement, date = tomorrow) {
  fireEvent.change(container.querySelector('input[name="value"]')!, {
    target: { value: '100' },
  });
  fireEvent.change(container.querySelector('select[name="currency"]')!, {
    target: { value: 'USD' },
  });
  fireEvent.change(container.querySelector('input[name="payeerDocument"]')!, {
    target: { value: '123456789' },
  });
  fireEvent.change(container.querySelector('input[name="transferDate"]')!, {
    target: { value: date },
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockGetCurrency.mockReturnValue(mockCurrencies);
  (useProduct as jest.Mock).mockReturnValue({ ...defaultHook });
});

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

describe('TrasferCard - render', () => {
  it('renders the transfer form', () => {
    const { container } = render(<TrasferCard />);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<TrasferCard />);
    expect(screen.getByRole('button', { name: /transferir/i })).toBeInTheDocument();
  });

  it('renders currency options from getCurrency', () => {
    render(<TrasferCard />);
    expect(screen.getByText('USD - Dólar Estadounidense')).toBeInTheDocument();
    expect(screen.getByText('EUR - Euro')).toBeInTheDocument();
  });

  it('renders a default placeholder option for currency', () => {
    render(<TrasferCard />);
    expect(screen.getByText('Seleccione una moneda')).toBeInTheDocument();
  });

  it('submit button is disabled when form is incomplete', () => {
    render(<TrasferCard />);
    expect(screen.getByRole('button', { name: /transferir/i })).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

describe('TrasferCard - loading state', () => {
  it('shows loading spinner when loading is true', () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, loading: true });
    render(<TrasferCard />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('does not show loading spinner when loading is false', () => {
    render(<TrasferCard />);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('disables submit button while loading', () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, loading: true });
    render(<TrasferCard />);
    expect(screen.getByRole('button', { name: /transferir/i })).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Error display
// ---------------------------------------------------------------------------

describe('TrasferCard - error display', () => {
  it('shows error message when error is set', () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, error: 'Insufficient funds' });
    render(<TrasferCard />);
    expect(screen.getByText('Insufficient funds')).toBeInTheDocument();
  });

  it('does not show error section when error is null', () => {
    render(<TrasferCard />);
    expect(screen.queryByText('Insufficient funds')).not.toBeInTheDocument();
  });

  it('error message is rendered in red text', () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, error: 'Transfer error' });
    render(<TrasferCard />);
    const errorEl = screen.getByText('Transfer error');
    expect(errorEl.className).toContain('text-red');
  });
});

// ---------------------------------------------------------------------------
// Success message
// ---------------------------------------------------------------------------

describe('TrasferCard - success message', () => {
  it('shows transferMessage when set', () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, transferMessage: 'Transfer successful' });
    render(<TrasferCard />);
    expect(screen.getByText('Transfer successful')).toBeInTheDocument();
  });

  it('does not show transferMessage when null', () => {
    render(<TrasferCard />);
    expect(screen.queryByText('Transfer successful')).not.toBeInTheDocument();
  });

  it('success message is rendered in green text', () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, transferMessage: 'Transferencia exitosa' });
    render(<TrasferCard />);
    const msg = screen.getByText('Transferencia exitosa');
    expect(msg.className).toContain('text-green');
  });
});

// ---------------------------------------------------------------------------
// Form validation
// ---------------------------------------------------------------------------

describe('TrasferCard - form validation', () => {
  it('enables submit button when all fields are filled with valid data', () => {
    const { container } = render(<TrasferCard />);
    fillForm(container);
    expect(screen.getByRole('button', { name: /transferir/i })).not.toBeDisabled();
  });

  it('keeps submit disabled when value is 0', () => {
    const { container } = render(<TrasferCard />);
    fireEvent.change(container.querySelector('select[name="currency"]')!, { target: { value: 'USD' } });
    fireEvent.change(container.querySelector('input[name="payeerDocument"]')!, { target: { value: '123' } });
    fireEvent.change(container.querySelector('input[name="transferDate"]')!, { target: { value: tomorrow } });
    expect(screen.getByRole('button', { name: /transferir/i })).toBeDisabled();
  });

  it('keeps submit disabled when currency is not selected', () => {
    const { container } = render(<TrasferCard />);
    fireEvent.change(container.querySelector('input[name="value"]')!, { target: { value: '100' } });
    fireEvent.change(container.querySelector('input[name="payeerDocument"]')!, { target: { value: '123' } });
    fireEvent.change(container.querySelector('input[name="transferDate"]')!, { target: { value: tomorrow } });
    expect(screen.getByRole('button', { name: /transferir/i })).toBeDisabled();
  });

  it('shows alert when form is submitted with empty fields', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { container } = render(<TrasferCard />);

    fireEvent.submit(container.querySelector('form')!);

    expect(alertSpy).toHaveBeenCalledWith('Todos los campos son obligatorios');
    alertSpy.mockRestore();
  });

  it('shows alert when transfer date is in the past', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { container } = render(<TrasferCard />);
    fillForm(container, yesterday);

    fireEvent.submit(container.querySelector('form')!);

    expect(alertSpy).toHaveBeenCalledWith('La fecha no puede ser menor al día de hoy');
    alertSpy.mockRestore();
  });

  it('only allows numeric input in value field', () => {
    const { container } = render(<TrasferCard />);
    const valueInput = container.querySelector('input[name="value"]') as HTMLInputElement;

    fireEvent.change(valueInput, { target: { value: 'abc123' } });

    expect(valueInput.value).toBe('123');
  });

  it('only allows numeric input in payeerDocument field', () => {
    const { container } = render(<TrasferCard />);
    const docInput = container.querySelector('input[name="payeerDocument"]') as HTMLInputElement;

    fireEvent.change(docInput, { target: { value: 'doc9876' } });

    expect(docInput.value).toBe('9876');
  });
});

// ---------------------------------------------------------------------------
// Form submission
// ---------------------------------------------------------------------------

describe('TrasferCard - form submission', () => {
  it('calls setTransfer with correct data on valid submit', async () => {
    mockSetTransfer.mockResolvedValue(undefined);
    const { container } = render(<TrasferCard />);
    fillForm(container);

    fireEvent.click(screen.getByRole('button', { name: /transferir/i }));

    await waitFor(() => {
      expect(mockSetTransfer).toHaveBeenCalledWith({
        value: 100,
        currency: 'USD',
        payeerDocument: '123456789',
        transferDate: tomorrow,
      });
    });
  });

  it('does not call setTransfer when form is incomplete', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { container } = render(<TrasferCard />);

    fireEvent.submit(container.querySelector('form')!);

    expect(mockSetTransfer).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('does not call setTransfer when date is in the past', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { container } = render(<TrasferCard />);
    fillForm(container, yesterday);

    fireEvent.submit(container.querySelector('form')!);

    expect(mockSetTransfer).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('resets form fields after successful transfer with no error', async () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, error: null });
    mockSetTransfer.mockResolvedValue(undefined);
    const { container } = render(<TrasferCard />);
    fillForm(container);

    fireEvent.click(screen.getByRole('button', { name: /transferir/i }));

    await waitFor(() => {
      expect(mockSetTransfer).toHaveBeenCalled();
    });

    await waitFor(() => {
      const valueInput = container.querySelector('input[name="value"]') as HTMLInputElement;
      expect(valueInput.value).toBe('0');
    });
  });
});
