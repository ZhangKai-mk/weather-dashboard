# 🚀 部署指南

## 快速部署选项

### 选项 1：Vercel（推荐用于前端）

Vercel 是 React 项目的最佳部署平台。

#### 步骤 1：连接 GitHub

1. 访问 [Vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 选择 `weather-dashboard` 项目

#### 步骤 2：配置环境变量

在 Vercel 项目设置中添加：

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
REACT_APP_DEFAULT_UNITS=metric
```

#### 步骤 3：部署

```bash
npm install -g vercel
vercel
```

### 选项 2：Heroku（用于后端）

Heroku 适合部署 Node.js 后端服务器。

```bash
heroku login
heroku create your-weather-api
heroku config:set REACT_APP_WEATHER_API_KEY=your_api_key_here
git push heroku main
```

---

祝部署成功！🚀
