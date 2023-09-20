/** @format */

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: "https://localhost:8090",
      changeOrigin: true,
      secure: false,
    })
  );
};
