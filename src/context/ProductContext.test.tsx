import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ProductProvider, useProductContext } from './ProductContext';

beforeEach(() => {
  localStorage.clear();
});

describe('ProductProvider', () => {
  it('provides null balance by default', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper: ProductProvider });

    expect(result.current.balance).toBeNull();
  });

  it('ignores invalid persisted balance values', () => {
    localStorage.setItem('bancoxyz_balance', 'undefined');

    const { result } = renderHook(() => useProductContext(), { wrapper: ProductProvider });

    expect(result.current.balance).toBeNull();
    expect(localStorage.getItem('bancoxyz_balance')).toBeNull();
  });

  it('saves balance and persists it to localStorage', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper: ProductProvider });
    const balance = { currency: 'USD', accountBalance: 100 };

    act(() => {
      result.current.saveBalance(balance);
    });

    expect(result.current.balance).toEqual(balance);
    expect(JSON.parse(localStorage.getItem('bancoxyz_balance')!)).toEqual(balance);
  });
});

describe('useProductContext', () => {
  it('throws when used outside ProductProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useProductContext())).toThrow(
      'useProductContext must be used within ProductProvider'
    );

    spy.mockRestore();
  });
});