import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransferTitle } from './index';

jest.mock('../TransferBalance', () => ({
  TransferBalance: () => <div data-testid="transfer-balance" />,
}));

describe('TransferTitle', () => {
  it('renders the page title Transferencias', () => {
    render(<TransferTitle />);
    expect(screen.getByRole('heading', { level: 1, name: /transferencias/i })).toBeInTheDocument();
  });

  it('renders the subtitle describing the transfer service', () => {
    render(<TransferTitle />);
    expect(screen.getByText(/rápida y segura/i)).toBeInTheDocument();
  });

  it('renders the TransferBalance subcomponent', () => {
    render(<TransferTitle />);
    expect(screen.getByTestId('transfer-balance')).toBeInTheDocument();
  });
});
