import { authService } from './service-auth';
import { endpointAuth } from '../../api/endpoint';

jest.mock('../../api/endpoint', () => ({
  endpointAuth: {
    login: jest.fn(),
  },
}));

const mockLogin = endpointAuth.login as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('authService.login', () => {
  it('calls endpointAuth.login with the provided request', async () => {
    const request = { email: 'test@test.com', password: '123456' };
    const data = { token: 'tok', user: { id: 1, name: 'Test', email: 'test@test.com' } };
    mockLogin.mockResolvedValue({ data });

    await authService.login(request);

    expect(mockLogin).toHaveBeenCalledWith(request);
  });

  it('returns response.data on success', async () => {
    const request = { email: 'test@test.com', password: '123456' };
    const data = { token: 'tok', user: { id: 1, name: 'Test', email: 'test@test.com' } };
    mockLogin.mockResolvedValue({ data });

    const result = await authService.login(request);

    expect(result).toEqual(data);
  });

  it('propagates errors thrown by the endpoint', async () => {
    const request = { email: 'test@test.com', password: 'wrong' };
    const error = { response: { data: { message: 'Unauthorized' } } };
    mockLogin.mockRejectedValue(error);

    await expect(authService.login(request)).rejects.toEqual(error);
  });
});
