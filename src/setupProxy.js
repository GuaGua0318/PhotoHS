// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',  //如果请求路径是api就使用api，如果是ajax就是ajax
//     createProxyMiddleware({
//       target: 'http://localhost:3000/',	//将资源转到当前端口实现跨域
//       changeOrigin: true,
//       pathRewrite:{'^/api':''}
//     })
//   );
// };