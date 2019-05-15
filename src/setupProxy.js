const proxy = require('http-proxy-middleware');

console.log('Setup Proxy Running');

module.exports = function(app) {
  app.use(proxy('/services', {
    target: "https://qa.wappsto.com/",
    changeOrigin: true,
    ws: true
  }));
};
