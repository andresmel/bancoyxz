import { renderHook, act } from '@testing-library/react';
import { useProduct } from './useProduct';
import { productService } from '../../services/product/service-product';
import { useProductContext } from '../../context/ProductContext';
import toast from 'react-hot-toast';

jest.mock('../../services/product/service-product', () => ({
  productService: {
    getBalance: jest.fn(),
    setTransfer: jest.fn(),
    getCurrency: jest.fn(),
    getListTransfers: jest.fn(),
  },
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

jest.mock('../../context/ProductContext');

const mockSetTransfer = productService.setTransfer as jest.Mock;
const mockGetCurrency = productService.getCurrency as jest.Mock;
const mockGetListTransfers = productService.getListTransfers as jest.Mock;
const mockSaveBalance = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useProductContext as jest.Mock).mockReturnValue({ balance: null, saveBalance: mockSaveBalance });
});

// ---------------------------------------------------------------------------
// setTransfer
// ---------------------------------------------------------------------------

describe('useProduct - setTransfer', () => {
  it('initializes with loading false, error null and transferMessage null', () => {
    const { result } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.transferMessage).toBeNull();
  });

  it('sets loading true while the request is in flight', async () => {
    let resolveTransfer!: (v: any) => void;
    mockSetTransfer.mockReturnValue(new Promise((res) => { resolveTransfer = res; }));

    const { result } = renderHook(() => useProduct());

    act(() => {
      result.current.setTransfer({ value: 100, currency: 'USD', payeerDocument: '123', transferDate: '2026-06-12' });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => { resolveTransfer({ status: 'success' }); });

    expect(result.current.loading).toBe(false);
  });

  it('sets transferMessage and calls toast.success on success', async () => {
    mockSetTransfer.mockResolvedValue({ status: 'Transfer successful' });

    const { result } = renderHook(() => useProduct());

    await act(async () => {
      await result.current.setTransfer({ value: 100, currency: 'USD', payeerDocument: '123', transferDate: '2026-06-12' });
    });

    expect(result.current.transferMessage).toBe('Transfer successful');
    expect(toast.success).toHaveBeenCalledWith('Transfer successful');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('uses fallback transferMessage when status is undefined', async () => {
    mockSetTransfer.mockResolvedValue({});

    const { result } = renderHook(() => useProduct());

    await act(async () => {
      await result.current.setTransfer({ value: 100, currency: 'USD', payeerDocument: '123', transferDate: '2026-06-12' });
    });

    expect(result.current.transferMessage).toBe('Transfer successful');
    expect(toast.success).toHaveBeenCalledWith('Transfer successful');
  });

  it('sets error and calls toast.error on failure', async () => {
    const error = { response: { data: { message: 'Insufficient funds' } } };
    mockSetTransfer.mockRejectedValue(error);

    const { result } = renderHook(() => useProduct());

    await act(async () => {
      await result.current.setTransfer({ value: 99999, currency: 'USD', payeerDocument: '123', transferDate: '2026-06-12' });
    });

    expect(result.current.error).toBe('Insufficient funds');
    expect(toast.error).toHaveBeenCalledWith('Insufficient funds');
    expect(result.current.loading).toBe(false);
  });

  it('uses fallback error message when response has no message', async () => {
    mockSetTransfer.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useProduct());

    await act(async () => {
      await result.current.setTransfer({ value: 100, currency: 'USD', payeerDocument: '123', transferDate: '2026-06-12' });
    });

    expect(result.current.error).toBe('Failed to set transfer');
    expect(toast.error).toHaveBeenCalledWith('Failed to set transfer');
  });

  it('clears a previous error before a new transfer attempt', async () => {
    mockSetTransfer
      .mockRejectedValueOnce({ response: { data: { message: 'First error' } } })
      .mockResolvedValueOnce({ status: 'success' });

    const { result } = renderHook(() => useProduct());

    await act(async () => {
      await result.current.setTransfer({ value: 100, currency: 'USD', payeerDocument: '123', transferDate: '2026-06-12' });
    });
    expect(result.current.error).toBe('First error');

    await act(async () => {
      await result.current.setTransfer({ value: 200, currency: 'EUR', payeerDocument: '987', transferDate: '2026-06-15' });
    });
    expect(result.current.error).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// getCurrency
// ---------------------------------------------------------------------------

describe('useProduct - getCurrency', () => {
  it('delegates to productService.getCurrency and returns its result', () => {
    const currencies = [
      { id: 1, code: 'USD', name: 'Dólar Estadounidense' },
      { id: 2, code: 'EUR', name: 'Euro' },
    ];
    mockGetCurrency.mockReturnValue(currencies);

    const { result } = renderHook(() => useProduct());
    const res = result.current.getCurrency();

    expect(mockGetCurrency).toHaveBeenCalledTimes(1);
    expect(res).toEqual(currencies);
  });

  it('returns an empty array when productService returns nothing', () => {
    mockGetCurrency.mockReturnValue([]);

    const { result } = renderHook(() => useProduct());
    expect(result.current.getCurrency()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getListTransfers
// ---------------------------------------------------------------------------

const mockTransferHistory = {
  message: 'OK',
  transfers: [
    { value: 500, date: '2026-06-10', currency: 'USD', payeer: { document: '123456789', name: 'John Doe' } },
  ],
};

describe('useProduct - getListTransfers', () => {
  it('initializes with listTransfers null', () => {
    const { result } = renderHook(() => useProduct());

    expect(result.current.listTransfers).toBeNull();
  });

  it('sets loading true while the request is in flight', async () => {
    let resolve!: (v: any) => void;
    mockGetListTransfers.mockReturnValue(new Promise((res) => { resolve = res; }));

    const { result } = renderHook(() => useProduct());

    act(() => { result.current.getListTransfers(); });

    expect(result.current.loading).toBe(true);

    await act(async () => { resolve(mockTransferHistory); });

    expect(result.current.loading).toBe(false);
  });

  it('sets listTransfers on success', async () => {
    mockGetListTransfers.mockResolvedValue(mockTransferHistory);

    const { result } = renderHook(() => useProduct());

    await act(async () => { await result.current.getListTransfers(); });

    expect(result.current.listTransfers).toEqual(mockTransferHistory);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error and calls toast.error on failure', async () => {
    const error = { response: { data: { message: 'Unauthorized' } } };
    mockGetListTransfers.mockRejectedValue(error);

    const { result } = renderHook(() => useProduct());

    await act(async () => { await result.current.getListTransfers(); });

    expect(result.current.error).toBe('Unauthorized');
    expect(toast.error).toHaveBeenCalledWith('Unauthorized');
    expect(result.current.loading).toBe(false);
  });

  it('uses fallback error message when response has no message', async () => {
    mockGetListTransfers.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useProduct());

    await act(async () => { await result.current.getListTransfers(); });

    expect(result.current.error).toBe('Failed to fetch transfers list');
    expect(toast.error).toHaveBeenCalledWith('Failed to fetch transfers list');
  });

  it('validates token: sets error on 401 unauthorized response', async () => {
    const error = { response: { status: 401, data: { message: 'Token inválido o expirado' } } };
    mockGetListTransfers.mockRejectedValue(error);

    const { result } = renderHook(() => useProduct());

    await act(async () => { await result.current.getListTransfers(); });

    expect(result.current.error).toBe('Token inválido o expirado');
    expect(toast.error).toHaveBeenCalledWith('Token inválido o expirado');
  });

  it('clears a previous error before a new request', async () => {
    mockGetListTransfers
      .mockRejectedValueOnce({ response: { data: { message: 'Error previo' } } })
      .mockResolvedValueOnce(mockTransferHistory);

    const { result } = renderHook(() => useProduct());

    await act(async () => { await result.current.getListTransfers(); });
    expect(result.current.error).toBe('Error previo');

    await act(async () => { await result.current.getListTransfers(); });
    expect(result.current.error).toBeNull();
    expect(result.current.listTransfers).toEqual(mockTransferHistory);
  });
});
