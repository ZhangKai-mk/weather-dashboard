import React from 'react';
import './Forecast.css';
import { getWeatherIconUrl } from '../services/weatherApi';

function Forecast({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">📅 5天天气预报</h3>
      
      <div className="forecast-grid">
        {data.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{day.date}</div>
            
            <img 
              src={getWeatherIconUrl(day.icon)}
              alt={day.description}
              className="forecast-icon"
            />
            
            <div className="forecast-description">
              {day.description.charAt(0).toUpperCase() + day.description.slice(1)}
            </div>

            <div className="forecast-temps">
              <div className="temp-max">
                <span className="label">高</span>
                <span className="value">{Math.round(day.temp_max)}°</span>
              </div>
              <div className="temp-min">
                <span className="label">低</span>
                <span className="value">{Math.round(day.temp_min)}°</span>
              </div>
            </div>

            <div className="forecast-details">
              <div className="detail">
                <span className="icon">💧</span>
                <span className="info">{day.humidity}%</span>
              </div>
              <div className="detail">
                <span className="icon">🌪️</span>
                <span className="info">{day.windSpeed.toFixed(1)} m/s</span>
              </div>
              {day.precipitation > 0 && (
                <div className="detail">
                  <span className="icon">🌧️</span>
                  <span className="info">{day.precipitation.toFixed(1)} mm</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
