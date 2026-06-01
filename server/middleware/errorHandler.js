/**
 * 全局错误处理中间件
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // 处理 Axios 错误
  if (err.response) {
    // API 返回错误响应
    const statusCode = err.response.status;
    const data = err.response.data;

    if (statusCode === 404) {
      return res.status(404).json({
        error: 'Not Found',
        message: data.message || '找不到指定的城市',
        detail: data.cod === '404' ? data.message : null,
      });
    }

    if (statusCode === 401) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'API 密钥无效或已过期',
      });
    }

    if (statusCode === 429) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: '请求过于频繁，请稍候再试',
      });
    }

    return res.status(statusCode || 500).json({
      error: 'API Error',
      message: data.message || '外部 API 服务出错',
      statusCode,
    });
  }

  if (err.request) {
    // 请求已发送但没有收到响应
    return res.status(503).json({
      error: 'Service Unavailable',
      message: '无法连接到天气服务，请检查网络连接',
    });
  }

  // 其他错误
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || '服务器内部错误',
  });
};

module.exports = errorHandler;
