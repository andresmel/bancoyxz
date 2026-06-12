import React from 'react';
import { render, screen } from '@testing-library/react';
import TransfersPage from './index';

jest.mock('./ui/TransferTitle', () => ({
  TransferTitle: () => <div data-testid="transfer-title" />,
}));

jest.mock('./ui/TransferdCard', () => ({
  TrasferCard: () => <div data-testid="transfer-card" />,
}));

describe('TransfersPage', () => {
  it('renders the TransferTitle subcomponent', () => {
    render(<TransfersPage />);
    expect(screen.getByTestId('transfer-title')).toBeInTheDocument();
  });

  it('renders the TrasferCard subcomponent', () => {
    render(<TransfersPage />);
    expect(screen.getByTestId('transfer-card')).toBeInTheDocument();
  });

  it('renders both subcomponents together', () => {
    render(<TransfersPage />);
    expect(screen.getByTestId('transfer-title')).toBeInTheDocument();
    expect(screen.getByTestId('transfer-card')).toBeInTheDocument();
  });
});
