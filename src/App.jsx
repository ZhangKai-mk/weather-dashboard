import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData, fetchForecastData } from './services/weatherApi';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Beijing');
  const [darkMode, setDarkMode] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // 从本地存储加载最近搜索
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // 获取天气数据
  const handleSearch = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeatherData(searchCity);
      const forecastData = await fetchForecastData(searchCity);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCity(searchCity);

      // 保存最近搜索
      const updatedSearches = [searchCity, ...recentSearches.filter(s => s !== searchCity)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (err) {
      setError(err.message || '获取天气数据失败，请重试');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载默认城市
  useEffect(() => {
    handleSearch(city);
  }, []);

  // 处理地理定位
  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherData = await fetchWeatherData(null, latitude, longitude);
            const forecastData = await fetchForecastData(null, latitude, longitude);
            setCurrentWeather(weatherData);
            setForecast(forecastData);
            setCity(weatherData.name);
          } catch (err) {
            setError('无法获取您的位置天气数据');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('无法获取您的位置，请检查权限设置');
          setLoading(false);
        }
      );
    } else {
      setError('您的浏览器不支持地理定位');
    }
  };

  // 切换深色模式
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // 获取背景图片（根据天气条件）
  const getBackgroundImage = () => {
    if (!currentWeather) return 'default';
    const weather = currentWeather.weather[0].main.toLowerCase();
    const isDaytime = currentWeather.sys.sunrise < Date.now() / 1000 && Date.now() / 1000 < currentWeather.sys.sunset;
    
    if (weather.includes('cloud')) return isDaytime ? 'cloudy-day' : 'cloudy-night';
    if (weather.includes('rain')) return 'rainy';
    if (weather.includes('snow')) return 'snowy';
    if (weather.includes('clear') || weather.includes('sunny')) return isDaytime ? 'sunny' : 'clear-night';
    if (weather.includes('thunder')) return 'stormy';
    return isDaytime ? 'sunny' : 'clear-night';
  };

  return (
    <div className={`app ${getBackgroundImage()} ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="header">
          <h1 className="title">🌤️ Weather Dashboard</h1>
          <div className="header-controls">
            <button 
              className="btn-location"
              onClick={handleUseLocation}
              title="使用我的位置"
            >
              📍 My Location
            </button>
            <button 
              className="btn-theme"
              onClick={toggleDarkMode}
              title="切换深色模式"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <SearchBar 
          onSearch={handleSearch}
          recentSearches={recentSearches}
        />

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {loading && <LoadingSpinner />}

        {!loading && currentWeather && (
          <>
            <CurrentWeather data={currentWeather} />
            {forecast && <Forecast data={forecast} />}
          </>
        )}

        {!loading && !currentWeather && !error && (
          <div className="no-data">
            <p>搜索一个城市来查看天气</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Data from OpenWeatherMap | © 2024 Weather Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
