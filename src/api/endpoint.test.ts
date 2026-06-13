import { endpointTransferList } from './endpoint';
import { axiosTransferList } from './axiosConfig';

jest.mock('./axiosConfig', () => ({
  axiosAuth: { post: jest.fn() },
  axiosBalance: { get: jest.fn() },
  axiosTransfer: { post: jest.fn() },
  axiosTransferList: { get: jest.fn() },
}));

const mockGet = axiosTransferList.get as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// endpointTransferList.getTransferList
// ---------------------------------------------------------------------------

describe('endpointTransferList.getTransferList', () => {
  const transferHistory = {
    message: 'OK',
    transfers: [
      { value: 500, date: '2026-06-10', currency: 'USD', payeer: { document: '123456789', name: 'John Doe' } },
    ],
  };

  it('calls axiosTransferList.get with /transferList', async () => {
    mockGet.mockResolvedValue({ data: transferHistory });

    const result = await endpointTransferList.getTransferList();

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith('/transferList');
    expect(result).toEqual({ data: transferHistory });
  });

  it('returns the full axios response (data lives in response.data)', async () => {
    mockGet.mockResolvedValue({ data: transferHistory });

    const result = await endpointTransferList.getTransferList();

    expect(result.data).toEqual(transferHistory);
    expect(result.data.transfers).toHaveLength(1);
  });

  it('returns an empty transfers array when the list is empty', async () => {
    const empty = { message: 'OK', transfers: [] };
    mockGet.mockResolvedValue({ data: empty });

    const result = await endpointTransferList.getTransferList();

    expect(result.data.transfers).toHaveLength(0);
  });

  it('validates token: propagates 401 unauthorized errors', async () => {
    const error = { response: { status: 401, data: { message: 'Token inválido o expirado' } } };
    mockGet.mockRejectedValue(error);

    await expect(endpointTransferList.getTransferList()).rejects.toEqual(error);
  });

  it('propagates network errors', async () => {
    mockGet.mockRejectedValue(new Error('Network Error'));

    await expect(endpointTransferList.getTransferList()).rejects.toThrow('Network Error');
  });
});
