import React from 'react';
import { render, screen } from '@testing-library/react';
import ListTransfersPage from './index';

jest.mock('./ui/TransferListTitle', () => ({
  TransferListTitle: () => <div data-testid="transfer-list-title" />,
}));

jest.mock('./ui/TranSferlISTTable', () => ({
  TransferListTable: () => <div data-testid="transfer-list-table" />,
}));

describe('ListTransfersPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<ListTransfersPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders TransferListTitle', () => {
    render(<ListTransfersPage />);
    expect(screen.getByTestId('transfer-list-title')).toBeInTheDocument();
  });

  it('renders TransferListTable', () => {
    render(<ListTransfersPage />);
    expect(screen.getByTestId('transfer-list-table')).toBeInTheDocument();
  });

  it('renders both subcomponents together', () => {
    render(<ListTransfersPage />);
    expect(screen.getByTestId('transfer-list-title')).toBeInTheDocument();
    expect(screen.getByTestId('transfer-list-table')).toBeInTheDocument();
  });
});
