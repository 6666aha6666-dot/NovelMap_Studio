const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // 允许所有跨域请求 (CORS Headers)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 目标上游地址
  const targetBase = req.headers['x-target-base'] || 'https://flos-api.com/v1';
  const targetParsed = url.parse(targetBase);

  // 拼接路径
  const upstreamPath = (targetParsed.pathname.replace(/\/+$/, '') + req.url.replace(/^\/+/, '/')).replace('//', '/');

  const options = {
    hostname: targetParsed.hostname,
    port: targetParsed.port || 443,
    path: upstreamPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: targetParsed.hostname
    }
  };

  // 移除本地专用头部
  delete options.headers['x-target-base'];

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, {
      ...proxyRes.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  });

  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`NovelMap Studio 本地 CORS 代理服务已启动: http://127.0.0.1:${PORT}`);
});
