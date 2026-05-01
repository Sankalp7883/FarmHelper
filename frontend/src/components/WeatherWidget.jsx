import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
} from 'react-icons/wi';

const weatherIcons = {
  '01d': <WiDaySunny />,
  '01n': <WiDaySunny />,
  '02d': <WiDayCloudy />,
  '02n': <WiDayCloudy />,
  '03d': <WiCloud />,
  '03n': <WiCloud />,
  '04d': <WiCloud />,
  '04n': <WiCloud />,
  '09d': <WiRain />,
  '09n': <WiRain />,
  '10d': <WiRain />,
  '10n': <WiRain />,
  '11d': <WiThunderstorm />,
  '11n': <WiThunderstorm />,
  '13d': <WiSnow />,
  '13n': <WiSnow />,
  '50d': <WiFog />,
  '50n': <WiFog />,
};

const WeatherWidget = ({ weather }) => {
  if (!weather) {
    return (
      <div className="weather-card glass-card" id="weather-widget">
        <div className="weather-card-empty">
          <div className="weather-card-empty-icon">🌤️</div>
          <p style={{ fontWeight: 600 }}>Weather Info</p>
          <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            Search for a location to see current weather
          </p>
        </div>
      </div>
    );
  }

  const icon = weatherIcons[weather.icon] || <WiDaySunny />;

  return (
    <div className="weather-card glass-card" id="weather-widget">
      <div className="weather-icon-large">{icon}</div>
      <div className="weather-temp">{weather.temperature}°C</div>
      <div className="weather-city">{weather.city || weather.location}</div>
      <div className="weather-desc">{weather.description}</div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <div className="weather-detail-label">Feels Like</div>
          <div className="weather-detail-value">
            {weather.feelsLike || weather.temperature}°C
          </div>
        </div>
        <div className="weather-detail-item">
          <div className="weather-detail-label">Humidity</div>
          <div className="weather-detail-value">{weather.humidity}%</div>
        </div>
        {weather.windSpeed && (
          <div className="weather-detail-item">
            <div className="weather-detail-label">Wind</div>
            <div className="weather-detail-value">{weather.windSpeed} m/s</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
