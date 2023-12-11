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
  app.use(
    "/media/rtsp/video1", // 프록시할 경로 (경로는 서버에 따라 다를 수 있음)
    createProxyMiddleware({
      target: "ws://192.168.13.105:80", // WebSocket 서버 주소 및 포트
      ws: true, // WebSocket 프록시 활성화
      changeOrigin: true, // 변경된 오리진 사용 (CORS 우회)
      secure: false,
      pathRewrite: {
        "^/ws": "", // 경로에서 '/ws'를 제거
      },
    })
  );

  app.use(
    createProxyMiddleware("/mqtt", {
      ws: true,
      changeOrigin: true,
      autoRewrite: true,
      secure: false,
      // target: "ws://192.168.13.5:21985",
      target: "https://192.168.13.5:21985",
    })
  );
};
