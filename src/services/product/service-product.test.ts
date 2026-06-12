import { productService } from './service-product';
import { endpointBalance, endpointTransfer, endpointTransferList } from '../../api/endpoint';

jest.mock('../../api/endpoint', () => ({
  endpointBalance: { getBalance: jest.fn() },
  endpointTransfer: { setTransfer: jest.fn() },
  endpointTransferList: { getTransferList: jest.fn() },
}));

jest.mock('../../api/currency', () => ({
  currency: [
    { id: 1, code: 'USD', name: 'Dólar Estadounidense' },
    { id: 2, code: 'EUR', name: 'Euro' },
  ],
}));

const mockGetBalance = endpointBalance.getBalance as jest.Mock;
const mockSetTransfer = endpointTransfer.setTransfer as jest.Mock;
const mockGetTransferList = endpointTransferList.getTransferList as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// productService.getBalance
// ---------------------------------------------------------------------------

describe('productService.getBalance', () => {
  it('calls endpointBalance.getBalance and returns response data', async () => {
    const data = { currency: 'USD', accountBalance: 1000 };
    mockGetBalance.mockResolvedValue({ data });

    const result = await productService.getBalance();

    expect(mockGetBalance).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });

  it('propagates errors from endpointBalance.getBalance', async () => {
    const error = { response: { status: 401, data: { message: 'Unauthorized' } } };
    mockGetBalance.mockRejectedValue(error);

    await expect(productService.getBalance()).rejects.toEqual(error);
  });
});

// ---------------------------------------------------------------------------
// productService.setTransfer
// ---------------------------------------------------------------------------

describe('productService.setTransfer', () => {
  const request = {
    value: 200,
    currency: 'USD',
    payeerDocument: '123456789',
    transferDate: '2026-06-12',
  };

  it('calls endpointTransfer.setTransfer with the request body', async () => {
    const data = { status: 'success' };
    mockSetTransfer.mockResolvedValue({ data });

    await productService.setTransfer(request);

    expect(mockSetTransfer).toHaveBeenCalledTimes(1);
    expect(mockSetTransfer).toHaveBeenCalledWith(request);
  });

  it('returns response.data on success', async () => {
    const data = { status: 'success' };
    mockSetTransfer.mockResolvedValue({ data });

    const result = await productService.setTransfer(request);

    expect(result).toEqual(data);
  });

  it('propagates errors from endpointTransfer.setTransfer', async () => {
    const error = { response: { status: 400, data: { message: 'Transfer failed' } } };
    mockSetTransfer.mockRejectedValue(error);

    await expect(productService.setTransfer(request)).rejects.toEqual(error);
  });
});

// ---------------------------------------------------------------------------
// productService.getCurrency
// ---------------------------------------------------------------------------

describe('productService.getCurrency', () => {
  it('returns the currency list', () => {
    const result = productService.getCurrency();

    expect(result).toEqual([
      { id: 1, code: 'USD', name: 'Dólar Estadounidense' },
      { id: 2, code: 'EUR', name: 'Euro' },
    ]);
  });

  it('returns an array', () => {
    expect(Array.isArray(productService.getCurrency())).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// productService.getListTransfers
// ---------------------------------------------------------------------------

describe('productService.getListTransfers', () => {
  const transferHistory = {
    message: 'OK',
    transfers: [
      { value: 500, date: '2026-06-10', currency: 'USD', payeer: { document: '123456789', name: 'John Doe' } },
    ],
  };

  it('calls endpointTransferList.getTransferList and returns response data', async () => {
    mockGetTransferList.mockResolvedValue({ data: transferHistory });

    const result = await productService.getListTransfers();

    expect(mockGetTransferList).toHaveBeenCalledTimes(1);
    expect(result).toEqual(transferHistory);
  });

  it('returns an empty transfers array when the list is empty', async () => {
    const empty = { message: 'OK', transfers: [] };
    mockGetTransferList.mockResolvedValue({ data: empty });

    const result = await productService.getListTransfers();

    expect(result.transfers).toHaveLength(0);
  });

  it('propagates errors from endpointTransferList.getTransferList', async () => {
    const error = { response: { status: 401, data: { message: 'Unauthorized' } } };
    mockGetTransferList.mockRejectedValue(error);

    await expect(productService.getListTransfers()).rejects.toEqual(error);
  });

  it('propagates network errors', async () => {
    mockGetTransferList.mockRejectedValue(new Error('Network Error'));

    await expect(productService.getListTransfers()).rejects.toThrow('Network Error');
  });
});
