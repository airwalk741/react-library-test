/** @format */

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/payments",
    createProxyMiddleware({
      target: "https://api.iamport.kr/payments/prepare",
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    "/users",
    createProxyMiddleware({
      target: "https://api.iamport.kr/payments/prepare",
      changeOrigin: true,
      secure: false,
    })
  );
};
