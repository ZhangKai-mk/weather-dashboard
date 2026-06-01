import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = process.env.REACT_APP_WEATHER_API_URL;
const DEFAULT_UNITS = process.env.REACT_APP_DEFAULT_UNITS || 'metric';

if (!API_KEY) {
  console.warn('Warning: REACT_APP_WEATHER_API_KEY is not set in .env file');
}

// 创建 axios 实例
const weatherClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 获取当前天气数据
 * @param {string} city - 城市名称
 * @param {number} lat - 纬度（如果使用地理定位）
 * @param {number} lon - 经度（如果使用地理定位）
 * @returns {Promise} 天气数据
 */
export const fetchWeatherData = async (city, lat, lon) => {
  try {
    const params = {
      appid: API_KEY,
      units: DEFAULT_UNITS,
      lang: 'zh_cn',
    };

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else if (city) {
      params.q = city;
    } else {
      throw new Error('必须提供城市名称或坐标');
    }

    const response = await weatherClient.get('/weather', { params });
    
    if (response.status !== 200) {
      throw new Error(`API 错误: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('找不到该城市，请检查拼写');
      } else if (error.response.status === 401) {
        throw new Error('API 密钥无效');
      } else if (error.response.status === 429) {
        throw new Error('请求过于频繁，请稍候再试');
      }
    }
    
    throw new Error(error.message || '获取天气数据失败');
  }
};

/**
 * 获取5天天气预报数据
 * @param {string} city - 城市名称
 * @param {number} lat - 纬度（如果使用地理定位）
 * @param {number} lon - 经度（如果使用地理定位）
 * @returns {Promise} 预报数据
 */
export const fetchForecastData = async (city, lat, lon) => {
  try {
    const params = {
      appid: API_KEY,
      units: DEFAULT_UNITS,
      lang: 'zh_cn',
      cnt: 40, // 5天 * 8个数据点（每3小时一个）
    };

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else if (city) {
      params.q = city;
    } else {
      throw new Error('必须提供城市名称或坐标');
    }

    const response = await weatherClient.get('/forecast', { params });
    
    if (response.status !== 200) {
      throw new Error(`API 错误: ${response.status}`);
    }

    // 处理预报数据，按天分组
    const dailyForecasts = groupForecastByDay(response.data.list);
    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw new Error(error.message || '获取预报数据失败');
  }
};

/**
 * 将预报数据按天分组
 * @param {Array} list - 预报列表
 * @returns {Array} 按天分组后的数据
 */
const groupForecastByDay = (list) => {
  const grouped = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    });

    if (!grouped[day]) {
      grouped[day] = {
        date: day,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        precipitation: item.rain ? item.rain['3h'] : 0,
      };
    } else {
      if (item.main.temp_max > grouped[day].temp_max) {
        grouped[day].temp_max = item.main.temp_max;
      }
      if (item.main.temp_min < grouped[day].temp_min) {
        grouped[day].temp_min = item.main.temp_min;
      }
    }
  });

  return Object.values(grouped).slice(0, 5);
};

/**
 * 获取天气图标 URL
 * @param {string} iconCode - OpenWeatherMap 图标代码
 * @returns {string} 图标 URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * 格式化温度
 * @param {number} temp - 温度值
 * @returns {string} 格式化后的温度
 */
export const formatTemperature = (temp) => {
  return Math.round(temp);
};

/**
 * 获取中文风向
 * @param {number} degrees - 风向角度（0-360）
 * @returns {string} 风向
 */
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  const windMap = {
    'N': '北',
    'NE': '东北',
    'E': '东',
    'SE': '东南',
    'S': '南',
    'SW': '西南',
    'W': '西',
    'NW': '西北',
    'NNE': '北偏东',
    'ENE': '东偏北',
    'ESE': '东偏南',
    'SSE': '南偏东',
    'SSW': '南偏西',
    'WSW': '西偏南',
    'WNW': '西偏北',
    'NNW': '北偏西',
  };
  return windMap[directions[index]] || '未知';
};

/**
 * 处理 API 响应错误
 * @param {Error} error - 错误对象
 * @returns {string} 错误信息
 */
export const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return '请求参数错误';
      case 401:
        return 'API 密钥无效或已过期';
      case 404:
        return '找不到指定的城市或资源';
      case 429:
        return '请求过于频繁，请稍候再试';
      case 500:
        return '服务器出错，请稍候再试';
      default:
        return `API 错误: ${error.response.status}`;
    }
  } else if (error.request) {
    return '网络连接失败，请检查网络';
  }
  return '发生未知错误';
};
