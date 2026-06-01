# 🌤️ Weather Dashboard

一个功能完整的天气仪表板应用，使用 OpenWeatherMap API 获取实时天气数据。

## ✨ 功能特性

- 🔍 **城市搜索** - 搜索全球任何城市的天气
- 🌡️ **实时天气** - 显示当前温度、湿度、风速等信息
- 📊 **5天预报** - 查看未来5天的天气预测
- 🎨 **动态背景** - 根据天气条件显示不同背景
- 📍 **地理定位** - 自动获取用户位置并显示本地天气
- 🌙 **深色模式** - 舒适的夜间浏览体验
- 💾 **本地存储** - 记住最近搜索的城市

## 🚀 快速开始

### 前置要求

- Node.js >= 14.0
- npm 或 yarn
- OpenWeatherMap API 密钥（免费注册）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/ZhangKai-mk/weather-dashboard.git
cd weather-dashboard
```

2. **安装依赖**
```bash
npm install
```

3. **配置 API 密钥**
```bash
cp .env.example .env
```
编辑 `.env` 文件，添加你的 OpenWeatherMap API 密钥：
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

4. **启动开发服务器**
```bash
npm start
```

访问 `http://localhost:3000` 查看应用

## 📁 项目结构

```
weather-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── Forecast.jsx
│   │   └── LoadingSpinner.jsx
│   ├── services/
│   │   └── weatherApi.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── server/
│   ├── routes/
│   │   └── weather.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## 🔧 技术栈

### 前端
- React 18+
- Axios - HTTP 请求库
- CSS3 - 样式和动画

### 后端
- Node.js + Express - 服务器框架
- Cors - 跨域资源共享
- Dotenv - 环境变量管理

### API
- OpenWeatherMap API - 天气数据源

## 📖 使用示例

### 搜索城市天气
1. 在搜索框中输入城市名称
2. 按 Enter 或点击搜索按钮
3. 查看当前天气和5天预报

### 启用地理定位
1. 点击"使用我的位置"按钮
2. 授予位置权限
3. 自动显示本地天气

## 🔐 环境变量

创建 `.env` 文件：

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DEFAULT_UNITS=metric
```

## 📝 获取 OpenWeatherMap API 密钥

1. 访问 https://openweathermap.org/api
2. 注册免费账户
3. 获取 API 密钥
4. 将密钥添加到 `.env` 文件

## 🚀 部署

详见 [DEPLOYMENT.md](DEPLOYMENT.md)

## 📱 响应式设计

- ✅ 桌面端 (1920px+)
- ✅ 平板端 (768px - 1024px)
- ✅ 手机端 (320px - 768px)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**祝你使用愉快！** 🌈
