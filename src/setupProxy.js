const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
      pathRewrite: { '^/login': '/default/login' }
    })
  );

  app.use(
    '/balance',
    createProxyMiddleware({
      target: 'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
      pathRewrite: { '^/balance': '/default/balance' }
    })
  );
};