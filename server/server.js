const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查路由
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Weather Dashboard Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API 路由
app.use('/api/weather', require('./routes/weather'));

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

// 错误处理中间件
app.use(require('./middleware/errorHandler'));

// 启动服务器
app.listen(PORT, () => {
  console.log(`🌤️  Weather Dashboard Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api`);
});

module.exports = app;
