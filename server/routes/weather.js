const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = process.env.REACT_APP_WEATHER_API_URL;

// 验证 API 密钥
if (!API_KEY) {
  console.warn('⚠️  Warning: REACT_APP_WEATHER_API_KEY is not set in .env file');
}

/**
 * GET /current - 获取当前天气
 * 参数: city (城市名) 或 lat/lon (坐标)
 */
router.get('/current', async (req, res, next) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: '必须提供 city 参数或 lat/lon 坐标',
      });
    }

    const params = {
      appid: API_KEY,
      units: 'metric',
      lang: 'zh_cn',
    };

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = city;
    }

    const response = await axios.get(`${API_URL}/weather`, { params });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /forecast - 获取天气预报
 * 参数: city (城市名) 或 lat/lon (坐标)
 */
router.get('/forecast', async (req, res, next) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: '必须提供 city 参数或 lat/lon 坐标',
      });
    }

    const params = {
      appid: API_KEY,
      units: 'metric',
      lang: 'zh_cn',
      cnt: 40,
    };

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = city;
    }

    const response = await axios.get(`${API_URL}/forecast`, { params });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
