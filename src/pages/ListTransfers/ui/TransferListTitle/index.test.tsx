import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransferListTitle } from './index';

describe('TransferListTitle', () => {
  it('renders without crashing', () => {
    const { container } = render(<TransferListTitle />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the title text', () => {
    render(<TransferListTitle />);
    expect(screen.getByText(/Historial de Transferencias/i)).toBeInTheDocument();
  });

  it('renders an h1 heading', () => {
    render(<TransferListTitle />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
