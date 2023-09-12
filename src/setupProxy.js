const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target:
        "https://port-0-webtoon-korea-server-30yyr422almfl7fw9.sel5.cloudtype.app",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};

// 깃허브에서는 안되네요...
