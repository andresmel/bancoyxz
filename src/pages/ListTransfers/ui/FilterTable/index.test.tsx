import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterTable } from './index';

jest.mock('lucide-react', () => ({ Search: () => null }));

jest.mock('../TranSferlISTTable', () => ({
  TransferListTable: ({ searchTerm, searchDate, onNoResults }: any) => (
    <>
      <div
        data-testid="transfer-list-table"
        data-search-term={searchTerm}
        data-search-date={searchDate}
      />
      <button data-testid="trigger-no-results" onClick={() => onNoResults(true)} />
      <button data-testid="trigger-has-results" onClick={() => onNoResults(false)} />
    </>
  ),
}));

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

describe('FilterTable - renders correctly', () => {
  it('renders the text search input', () => {
    render(<FilterTable />);

    expect(screen.getByPlaceholderText('Buscar por valor, destinatario')).toBeInTheDocument();
  });

  it('renders the TransferListTable', () => {
    render(<FilterTable />);

    expect(screen.getByTestId('transfer-list-table')).toBeInTheDocument();
  });

  it('does not show the no-results message on initial render', () => {
    render(<FilterTable />);

    expect(screen.queryByText('No se encontraron transferencias.')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Search term input
// ---------------------------------------------------------------------------

describe('FilterTable - text search', () => {
  it('passes updated searchTerm to TransferListTable', () => {
    render(<FilterTable />);

    fireEvent.change(screen.getByPlaceholderText('Buscar por valor, destinatario'), {
      target: { value: 'John' },
    });

    expect(screen.getByTestId('transfer-list-table')).toHaveAttribute('data-search-term', 'John');
  });

  it('clears searchDate when searchTerm changes', () => {
    const { container } = render(<FilterTable />);
    const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement;

    fireEvent.change(dateInput, { target: { value: '2026-06-10' } });
    fireEvent.change(screen.getByPlaceholderText('Buscar por valor, destinatario'), {
      target: { value: 'test' },
    });

    expect(screen.getByTestId('transfer-list-table')).toHaveAttribute('data-search-date', '');
  });
});

// ---------------------------------------------------------------------------
// Date search input
// ---------------------------------------------------------------------------

describe('FilterTable - date search', () => {
  it('passes updated searchDate to TransferListTable', () => {
    const { container } = render(<FilterTable />);
    const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement;

    fireEvent.change(dateInput, { target: { value: '2026-06-10' } });

    expect(screen.getByTestId('transfer-list-table')).toHaveAttribute('data-search-date', '2026-06-10');
  });

  it('clears searchTerm when searchDate changes', () => {
    const { container } = render(<FilterTable />);

    fireEvent.change(screen.getByPlaceholderText('Buscar por valor, destinatario'), {
      target: { value: 'John' },
    });

    const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2026-06-10' } });

    expect(screen.getByTestId('transfer-list-table')).toHaveAttribute('data-search-term', '');
  });
});

// ---------------------------------------------------------------------------
// No-results message
// ---------------------------------------------------------------------------

describe('FilterTable - no-results feedback', () => {
  it('shows no-results message when TransferListTable reports zero matches', () => {
    render(<FilterTable />);

    fireEvent.click(screen.getByTestId('trigger-no-results'));

    expect(screen.getByText('No se encontraron transferencias.')).toBeInTheDocument();
  });

  it('hides no-results message when TransferListTable reports matches', () => {
    render(<FilterTable />);

    fireEvent.click(screen.getByTestId('trigger-no-results'));
    fireEvent.click(screen.getByTestId('trigger-has-results'));

    expect(screen.queryByText('No se encontraron transferencias.')).not.toBeInTheDocument();
  });
});
