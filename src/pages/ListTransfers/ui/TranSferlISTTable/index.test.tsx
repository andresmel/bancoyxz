import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransferListTable } from './index';
import { useProduct } from '../../../../hooks/product/useProduct';

jest.mock('../../../../hooks/product/useProduct');
jest.mock('../../../../components/loading', () => ({
  Loading: () => <div data-testid="loading" />,
}));
jest.mock('lucide-react', () => ({ ArrowLeftRight: () => null }));

const mockUseProduct = useProduct as jest.Mock;
const mockGetListTransfers = jest.fn();

const sampleTransfers = {
  message: 'OK',
  transfers: [
    { value: 500, date: '2026-06-10', currency: 'USD', payeer: { document: '123456789', name: 'John Doe' } },
    { value: 200, date: '2026-06-11', currency: 'EUR', payeer: { document: '987654321', name: 'Jane Smith' } },
  ],
};

const defaultProps = { searchTerm: '', searchDate: '', onNoResults: jest.fn() };

beforeEach(() => {
  jest.clearAllMocks();
  mockUseProduct.mockReturnValue({
    getListTransfers: mockGetListTransfers,
    loading: false,
    error: null,
    listTransfers: sampleTransfers,
  });
});

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

describe('TransferListTable - renders correctly', () => {
  it('renders transfer rows from context data', () => {
    render(<TransferListTable {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<TransferListTable {...defaultProps} />);

    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Destinatario')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
  });

  it('shows empty-state message when transfers array is empty', () => {
    mockUseProduct.mockReturnValue({
      getListTransfers: mockGetListTransfers,
      loading: false,
      error: null,
      listTransfers: { message: 'OK', transfers: [] },
    });

    render(<TransferListTable {...defaultProps} />);

    expect(screen.getByText('No existen transferencias registradas.')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

describe('TransferListTable - loading state', () => {
  it('shows Loading component while fetching', () => {
    mockUseProduct.mockReturnValue({
      getListTransfers: mockGetListTransfers,
      loading: true,
      error: null,
      listTransfers: null,
    });

    render(<TransferListTable {...defaultProps} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('does not show Loading when not loading', () => {
    render(<TransferListTable {...defaultProps} />);

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Error / invalid credentials
// ---------------------------------------------------------------------------

describe('TransferListTable - error on invalid credentials', () => {
  it('shows error message when error state is set', () => {
    mockUseProduct.mockReturnValue({
      getListTransfers: mockGetListTransfers,
      loading: false,
      error: 'Failed to fetch transfers list',
      listTransfers: null,
    });

    render(<TransferListTable {...defaultProps} />);

    expect(screen.getByText('Failed to fetch transfers list')).toBeInTheDocument();
  });

  it('shows 401 token-expired error message', () => {
    mockUseProduct.mockReturnValue({
      getListTransfers: mockGetListTransfers,
      loading: false,
      error: 'Token inválido o expirado',
      listTransfers: null,
    });

    render(<TransferListTable {...defaultProps} />);

    expect(screen.getByText('Token inválido o expirado')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Context / refresh page
// ---------------------------------------------------------------------------

describe('TransferListTable - context and refresh page', () => {
  it('calls getListTransfers on mount (simulates page refresh)', () => {
    render(<TransferListTable {...defaultProps} />);

    expect(mockGetListTransfers).toHaveBeenCalledTimes(1);
  });

  it('renders data provided by context without extra API calls', () => {
    render(<TransferListTable {...defaultProps} />);

    expect(mockUseProduct).toHaveBeenCalled();
    expect(screen.getAllByText('USD').length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

describe('TransferListTable - filtering', () => {
  it('filters rows by searchTerm matching payeer name', () => {
    render(<TransferListTable searchTerm="John" searchDate="" onNoResults={jest.fn()} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('filters rows by searchDate', () => {
    render(<TransferListTable searchTerm="" searchDate="2026-06-11" onNoResults={jest.fn()} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('calls onNoResults(true) when no transfers match', () => {
    const onNoResults = jest.fn();

    render(<TransferListTable searchTerm="NOMATCH" searchDate="" onNoResults={onNoResults} />);

    expect(onNoResults).toHaveBeenCalledWith(true);
  });

  it('calls onNoResults(false) when transfers match', () => {
    const onNoResults = jest.fn();

    render(<TransferListTable searchTerm="John" searchDate="" onNoResults={onNoResults} />);

    expect(onNoResults).toHaveBeenCalledWith(false);
  });
});
