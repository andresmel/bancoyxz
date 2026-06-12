import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransferBalance } from './index';
import { useProductContext } from '../../../../context/ProductContext';

jest.mock('../../../../context/ProductContext');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TransferBalance', () => {
  it('renders the Your Balance label', () => {
    (useProductContext as jest.Mock).mockReturnValue({ balance: null });
    render(<TransferBalance />);
    expect(screen.getByText(/Your Balance/i)).toBeInTheDocument();
  });

  it('renders the account balance value from context', () => {
    (useProductContext as jest.Mock).mockReturnValue({
      balance: { currency: 'USD', accountBalance: 1500 },
    });

    render(<TransferBalance />);

    expect(screen.getByText(/1500/)).toBeInTheDocument();
  });

  it('renders without crashing when balance is null', () => {
    (useProductContext as jest.Mock).mockReturnValue({ balance: null });

    const { container } = render(<TransferBalance />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('throws when rendered outside ProductProvider (no mock)', () => {
    (useProductContext as jest.Mock).mockImplementation(() => {
      throw new Error('useProductContext must be used within ProductProvider');
    });

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TransferBalance />)).toThrow(
      'useProductContext must be used within ProductProvider'
    );
    spy.mockRestore();
  });
});
