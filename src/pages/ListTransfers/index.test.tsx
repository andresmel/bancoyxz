import React from 'react';
import { render, screen } from '@testing-library/react';
import ListTransfersPage from './index';

jest.mock('../../components/HeaderModules', () => ({
  HeaderModules: ({ titulo }: { titulo: string }) => (
    <div data-testid="header-modules">{titulo}</div>
  ),
}));

jest.mock('./ui/FilterTable', () => ({
  FilterTable: () => <div data-testid="filter-table" />,
}));

describe('ListTransfersPage', () => {
  it('renders correctly', () => {
    render(<ListTransfersPage />);

    expect(screen.getByTestId('header-modules')).toBeInTheDocument();
    expect(screen.getByTestId('filter-table')).toBeInTheDocument();
  });

  it('passes the correct title to HeaderModules', () => {
    render(<ListTransfersPage />);

    expect(screen.getByText('Historial de Transferencias')).toBeInTheDocument();
  });

  it('renders FilterTable that contains the transfer list', () => {
    render(<ListTransfersPage />);

    expect(screen.getByTestId('filter-table')).toBeInTheDocument();
  });
});
