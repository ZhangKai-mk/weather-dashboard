# 📋 详细安装指南

## 前置要求

- **Node.js** >= 14.0 (推荐 16+)
- **npm** >= 6.0 或 **yarn** >= 1.22
- **Git** (用于克隆项目)
- 有效的 **OpenWeatherMap API 密钥**

## 第一步：获取 OpenWeatherMap API 密钥

### 注册步骤

1. 访问 [OpenWeatherMap 官网](https://openweathermap.org/api)
2. 点击 "Sign Up" 按钮注册账户
3. 填写注册信息并验证邮箱
4. 登录后，进入 [API keys](https://home.openweathermap.org/api_keys) 页面
5. 复制默认的 API 密钥（或创建新密钥）

### 免费套餐说明

免费版 API 限制：
- ✅ 每分钟 60 次调用
- ✅ 支持所有主要功能（当前天气、预报等）
- ✅ 数据延迟约 10 分钟
- ❌ 不支持实时数据

## 第二步：克隆项目

```bash
git clone https://github.com/ZhangKai-mk/weather-dashboard.git
cd weather-dashboard
```

## 第三步：安装依赖

使用 npm：
```bash
npm install
```

或使用 yarn：
```bash
yarn install
```

## 第四步：配置环境变量

创建 `.env` 文件���
```bash
cp .env.example .env
```

编辑 `.env` 文件，添加你的 API 密钥：

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here_replace_this
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
REACT_APP_API_URL=http://localhost:5000/api
PORT=5000
REACT_APP_DEFAULT_UNITS=metric
REACT_APP_ENV=development
```

**⚠️ 重要**: 将 `your_api_key_here_replace_this` 替换为实际的 API 密钥

## 第五步：启动应用

### 仅启动前端

```bash
npm start
```

应用将自动打开 `http://localhost:3000`

### 启动完整应用（前端 + 后端）

```bash
npm run dev
```

### 仅启动后端服务器

```bash
npm run server
```

## 验证安装

### 检查前端

打开浏览器访问 `http://localhost:3000`

### 检查后端

访问 `http://localhost:5000/health`

## 常见问题排查

### 问题 1：API 返回 401 错误

- 检查 `.env` 文件中的 API 密钥是否正确
- 确保 API 密钥未过期
- 重启应用

### 问题 2：API 返回 404 错误

- 检查城市名称拼写
- 尝试使用英文城市名称（例如：Beijing 而不是 北京）

### 问题 3：CORS 错误

- 确保后端服务器正在运行
- 检查 `REACT_APP_API_URL` 配置是否正确

### 问题 4：端口被占用

```bash
# 在 macOS/Linux：
lsof -ti:3000 | xargs kill -9

# 或使用不同的端口：
PORT=3001 npm start
```

---

祝你使用愉快！🌤️
