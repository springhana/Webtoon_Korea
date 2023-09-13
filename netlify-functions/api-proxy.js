const { createProxyMiddleware } = require("http-proxy-middleware");

exports.handler = function (event, context, callback) {
  const proxy = createProxyMiddleware("/api", {
    target: process.env.REACT_APP_SERVER_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  });

  proxy(event, context, callback);
};
