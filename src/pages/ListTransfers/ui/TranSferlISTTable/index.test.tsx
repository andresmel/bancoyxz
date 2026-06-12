import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransferListTable } from './index';
import { useProduct } from '../../../../hooks/product/useProduct';

jest.mock('../../../../hooks/product/useProduct');

jest.mock('../../../../components/loading', () => ({
  Loading: () => <div data-testid="loading" />,
}));

const mockGetListTransfers = jest.fn();

const defaultHook = {
  getListTransfers: mockGetListTransfers,
  loading: false,
  error: null,
  listTransfers: null,
  balance: null,
  getBalance: jest.fn(),
  setTransfer: jest.fn(),
  transferMessage: null,
  getCurrency: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (useProduct as jest.Mock).mockReturnValue(defaultHook);
});

describe('TransferListTable', () => {
  it('renders without crashing', () => {
    const { container } = render(<TransferListTable />);
    expect(container).toBeInTheDocument();
  });

  it('calls getListTransfers on mount (refresh page)', () => {
    render(<TransferListTable />);
    expect(mockGetListTransfers).toHaveBeenCalledTimes(1);
  });

  it('shows the loading spinner while loading', () => {
    (useProduct as jest.Mock).mockReturnValue({ ...defaultHook, loading: true });
    render(<TransferListTable />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('does not show the loading spinner when not loading', () => {
    render(<TransferListTable />);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('shows an error message when error is set (invalid credentials)', () => {
    (useProduct as jest.Mock).mockReturnValue({
      ...defaultHook,
      error: 'Failed to fetch transfers list',
    });
    render(<TransferListTable />);
    expect(screen.getByText('Failed to fetch transfers list')).toBeInTheDocument();
  });

  it('shows 401 unauthorized error message', () => {
    (useProduct as jest.Mock).mockReturnValue({
      ...defaultHook,
      error: 'Token inválido o expirado',
    });
    render(<TransferListTable />);
    expect(screen.getByText('Token inválido o expirado')).toBeInTheDocument();
  });

  it('does not show an error message when error is null', () => {
    render(<TransferListTable />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('shows empty state message when transfers list is empty', () => {
    (useProduct as jest.Mock).mockReturnValue({
      ...defaultHook,
      listTransfers: { message: 'OK', transfers: [] },
    });
    render(<TransferListTable />);
    expect(screen.getByText(/No existen transferencias registradas/i)).toBeInTheDocument();
  });

  it('renders table header columns when transfers are present', () => {
    (useProduct as jest.Mock).mockReturnValue({
      ...defaultHook,
      listTransfers: {
        message: 'OK',
        transfers: [
          { value: 500, date: '2026-06-10', currency: 'USD', payeer: { document: '123', name: 'John' } },
        ],
      },
    });
    render(<TransferListTable />);
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Moneda')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Documento')).toBeInTheDocument();
    expect(screen.getByText('Destinatario')).toBeInTheDocument();
  });

  it('renders a row for each transfer', () => {
    (useProduct as jest.Mock).mockReturnValue({
      ...defaultHook,
      listTransfers: {
        message: 'OK',
        transfers: [
          { value: 500, date: '2026-06-10', currency: 'USD', payeer: { document: '111', name: 'John Doe' } },
          { value: 200, date: '2026-06-11', currency: 'EUR', payeer: { document: '222', name: 'Jane Smith' } },
        ],
      },
    });
    render(<TransferListTable />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders transfer date and document', () => {
    (useProduct as jest.Mock).mockReturnValue({
      ...defaultHook,
      listTransfers: {
        message: 'OK',
        transfers: [
          { value: 1000, date: '2026-06-10', currency: 'USD', payeer: { document: '999888777', name: 'Alice' } },
        ],
      },
    });
    render(<TransferListTable />);
    expect(screen.getByText('2026-06-10')).toBeInTheDocument();
    expect(screen.getByText('999888777')).toBeInTheDocument();
  });

  it('shows "Completada" status badge for each transfer', () => {
    (useProduct as jest.Mock).mockReturnValue({
      ...defaultHook,
      listTransfers: {
        message: 'OK',
        transfers: [
          { value: 100, date: '2026-01-01', currency: 'USD', payeer: { document: '1', name: 'Test' } },
        ],
      },
    });
    render(<TransferListTable />);
    expect(screen.getByText('Completada')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<TransferListTable />);
    expect(screen.getByText(/Historial de Transferencias/i)).toBeInTheDocument();
  });
});
