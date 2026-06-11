import { endpointAuth, endpointBalance } from './endpoint';
import { axiosInstance } from './axiosConfig';

jest.mock('./axiosConfig', () => ({
  axiosInstance: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockPost = axiosInstance.post as jest.Mock;
const mockGet = axiosInstance.get as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// endpointAuth
// ---------------------------------------------------------------------------

describe('endpointAuth.login', () => {
  it('calls axiosInstance.post with /login and the request body', async () => {
    const request = { email: 'user@test.com', password: 'pass123' };
    const response = { data: { token: 'tok', user: { id: 1, name: 'User', email: 'user@test.com' } } };
    mockPost.mockResolvedValue(response);

    const result = await endpointAuth.login(request);

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith('/login', request);
    expect(result).toEqual(response);
  });

  it('propagates errors thrown by axios', async () => {
    const request = { email: 'bad@test.com', password: 'wrong' };
    const error = { response: { status: 401, data: { message: 'Unauthorized' } } };
    mockPost.mockRejectedValue(error);

    await expect(endpointAuth.login(request)).rejects.toEqual(error);
  });
});

describe('endpointAuth.register', () => {
  it('calls axiosInstance.post with /register and the request body', async () => {
    const request = {
      name: 'Ana',
      username: 'ana',
      email: 'ana@test.com',
      password: 'secret',
      photo: 'https://example.com/photo.jpg',
    };
    const response = { data: { token: 'tok', user: { id: 2, name: 'Ana', email: 'ana@test.com' } } };
    mockPost.mockResolvedValue(response);

    const result = await endpointAuth.register(request);

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith('/register', request);
    expect(result).toEqual(response);
  });

  it('propagates errors thrown by axios', async () => {
    const request = {
      name: 'X',
      username: 'x',
      email: 'x@test.com',
      password: 'p',
      photo: '',
    };
    const error = { response: { status: 409, data: { message: 'Email already exists' } } };
    mockPost.mockRejectedValue(error);

    await expect(endpointAuth.register(request)).rejects.toEqual(error);
  });
});

// ---------------------------------------------------------------------------
// endpointBalance
// ---------------------------------------------------------------------------

describe('endpointBalance.getBalance', () => {
  it('calls axiosInstance.get with /balance', async () => {
    const response = { data: { currency: 'USD', accountBalance: 1500 } };
    mockGet.mockResolvedValue(response);

    const result = await endpointBalance.getBalance();

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith('/balance');
    expect(result).toEqual(response);
  });

  it('propagates errors thrown by axios', async () => {
    const error = { response: { status: 403, data: { message: 'Forbidden' } } };
    mockGet.mockRejectedValue(error);

    await expect(endpointBalance.getBalance()).rejects.toEqual(error);
  });
});
