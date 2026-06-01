import React from 'react';
import './CurrentWeather.css';
import { getWeatherIconUrl, formatTemperature, getWindDirection } from '../services/weatherApi';

function CurrentWeather({ data }) {
  if (!data) return null;

  const {
    name,
    sys,
    main,
    weather,
    wind,
    clouds,
    visibility,
  } = data;

  const temp = formatTemperature(main.temp);
  const feelsLike = formatTemperature(main.feels_like);
  const tempMax = formatTemperature(main.temp_max);
  const tempMin = formatTemperature(main.temp_min);
  const windDirection = getWindDirection(wind.deg);
  const weatherIcon = getWeatherIconUrl(weather[0].icon);
  const weatherDescription = weather[0].description;

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="current-weather">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">📍 {name}, {sys.country}</h2>
          <p className="weather-description">
            {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
          </p>
        </div>

        <div className="temperature-display">
          <img 
            src={weatherIcon} 
            alt={weatherDescription}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{temp}°</span>
            <span className="temp-unit">C</span>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-info">
            <p className="detail-label">体感温度</p>
            <p className="detail-value">{feelsLike}°C</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-info">
            <p className="detail-label">最高/最低</p>
            <p className="detail-value">{tempMax}°C / {tempMin}°C</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <div className="detail-info">
            <p className="detail-label">湿度</p>
            <p className="detail-value">{main.humidity}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌪️</div>
          <div className="detail-info">
            <p className="detail-label">风速</p>
            <p className="detail-value">{wind.speed} m/s</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🧭</div>
          <div className="detail-info">
            <p className="detail-label">风向</p>
            <p className="detail-value">{windDirection} ({wind.deg}°)</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">☁️</div>
          <div className="detail-info">
            <p className="detail-label">云量</p>
            <p className="detail-value">{clouds.all}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">👁️</div>
          <div className="detail-info">
            <p className="detail-label">能见度</p>
            <p className="detail-value">{(visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌊</div>
          <div className="detail-info">
            <p className="detail-label">气压</p>
            <p className="detail-value">{main.pressure} hPa</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌅</div>
          <div className="detail-info">
            <p className="detail-label">日出</p>
            <p className="detail-value">{sunrise}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌇</div>
          <div className="detail-info">
            <p className="detail-label">日落</p>
            <p className="detail-value">{sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
