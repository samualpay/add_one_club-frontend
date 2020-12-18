const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use("/api", createProxyMiddleware({ target: "http://localhost:5000" }));
  app.use(
    "/images",
    createProxyMiddleware({ target: "http://localhost:5000" })
  );
  app.use(
    "/videos",
    createProxyMiddleware({ target: "http://localhost:5000" })
  );
};
