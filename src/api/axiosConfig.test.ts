import axios from 'axios';

// Re-import after mocking to capture the configured instance
let axiosInstance: typeof import('./axiosConfig').axiosInstance;

beforeEach(() => {
  localStorage.clear();
  jest.resetModules();
  axiosInstance = require('./axiosConfig').axiosInstance;
});

afterEach(() => {
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// Helpers to invoke interceptors directly
// ---------------------------------------------------------------------------

function getRequestInterceptor() {
  // axios stores interceptors in handlers array
  const handlers = (axiosInstance.interceptors.request as any).handlers;
  return handlers[handlers.length - 1].fulfilled as (config: any) => any;
}

function getResponseErrorInterceptor() {
  const handlers = (axiosInstance.interceptors.response as any).handlers;
  return handlers[handlers.length - 1].rejected as (error: any) => any;
}

// ---------------------------------------------------------------------------
// axiosInstance basics
// ---------------------------------------------------------------------------

describe('axiosInstance', () => {
  it('is an axios instance', () => {
    expect(axiosInstance).toBeDefined();
    expect(typeof axiosInstance.get).toBe('function');
    expect(typeof axiosInstance.post).toBe('function');
  });

  it('has Content-Type: application/json as a default header', () => {
    const headers = (axiosInstance.defaults.headers as any);
    const contentType =
      headers['Content-Type'] ??
      headers.common?.['Content-Type'] ??
      headers.post?.['Content-Type'];
    expect(contentType).toBe('application/json');
  });
});

// ---------------------------------------------------------------------------
// Request interceptor
// ---------------------------------------------------------------------------

describe('request interceptor', () => {
  it('attaches Authorization header for a protected route when a token exists', () => {
    localStorage.setItem('bancoxyz_token', 'my-jwt');
    const interceptor = getRequestInterceptor();
    const config = { url: '/balance', headers: {} };

    const result = interceptor(config);

    expect(result.headers.Authorization).toBe('Bearer my-jwt');
  });

  it('does not attach Authorization header for /login even when a token exists', () => {
    localStorage.setItem('bancoxyz_token', 'my-jwt');
    const interceptor = getRequestInterceptor();
    const config = { url: '/login', headers: {} };

    const result = interceptor(config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it('does not attach Authorization header for /register even when a token exists', () => {
    localStorage.setItem('bancoxyz_token', 'my-jwt');
    const interceptor = getRequestInterceptor();
    const config = { url: '/register', headers: {} };

    const result = interceptor(config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it('does not attach Authorization header when no token is stored', () => {
    const interceptor = getRequestInterceptor();
    const config = { url: '/balance', headers: {} };

    const result = interceptor(config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it('returns the config object unchanged (same reference)', () => {
    const interceptor = getRequestInterceptor();
    const config = { url: '/balance', headers: {} };

    const result = interceptor(config);

    expect(result).toBe(config);
  });
});

// ---------------------------------------------------------------------------
// Response error interceptor
// ---------------------------------------------------------------------------

describe('response error interceptor', () => {
  it('removes bancoxyz_user and bancoxyz_token from localStorage on 401', async () => {
    localStorage.setItem('bancoxyz_user', JSON.stringify({ id: 1 }));
    localStorage.setItem('bancoxyz_token', 'tok');

    const interceptor = getResponseErrorInterceptor();
    const error = { response: { status: 401 } };

    await expect(interceptor(error)).rejects.toEqual(error);

    expect(localStorage.getItem('bancoxyz_user')).toBeNull();
    expect(localStorage.getItem('bancoxyz_token')).toBeNull();
  });

  it('does NOT clear localStorage for non-401 errors', async () => {
    localStorage.setItem('bancoxyz_user', JSON.stringify({ id: 1 }));
    localStorage.setItem('bancoxyz_token', 'tok');

    const interceptor = getResponseErrorInterceptor();
    const error = { response: { status: 500 } };

    await expect(interceptor(error)).rejects.toEqual(error);

    expect(localStorage.getItem('bancoxyz_user')).not.toBeNull();
    expect(localStorage.getItem('bancoxyz_token')).not.toBeNull();
  });

  it('rejects with the original error object', async () => {
    const interceptor = getResponseErrorInterceptor();
    const error = { response: { status: 403 } };

    await expect(interceptor(error)).rejects.toEqual(error);
  });
});
