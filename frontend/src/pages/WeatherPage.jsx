import { useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
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
  WiBarometer,
} from 'react-icons/wi';
import { HiOutlineSearch, HiOutlineLocationMarker } from 'react-icons/hi';

const weatherIcons = {
  '01d': <WiDaySunny />, '01n': <WiDaySunny />,
  '02d': <WiDayCloudy />, '02n': <WiDayCloudy />,
  '03d': <WiCloud />, '03n': <WiCloud />,
  '04d': <WiCloud />, '04n': <WiCloud />,
  '09d': <WiRain />, '09n': <WiRain />,
  '10d': <WiRain />, '10n': <WiRain />,
  '11d': <WiThunderstorm />, '11n': <WiThunderstorm />,
  '13d': <WiSnow />, '13n': <WiSnow />,
  '50d': <WiFog />, '50n': <WiFog />,
};

const WeatherPage = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/weather?location=${encodeURIComponent(location)}`);
      setWeather(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const icon = weather ? (weatherIcons[weather.icon] || <WiDaySunny />) : null;

  const getRainPrediction = () => {
    if (!weather) return null;
    const desc = weather.description?.toLowerCase() || '';
    if (desc.includes('rain') || desc.includes('drizzle')) return { text: 'Rain Expected', color: 'var(--color-info)' };
    if (desc.includes('thunderstorm')) return { text: 'Thunderstorm', color: 'var(--color-error)' };
    if (desc.includes('cloud')) return { text: 'Cloudy — Possible Rain', color: 'var(--color-warning)' };
    return { text: 'No Rain Expected', color: 'var(--color-success)' };
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard" id="weather-page">
          <div className="dashboard-header">
            <div className="dashboard-header-left">
              <h1>Weather Data</h1>
              <p>Check real-time weather conditions for any location.</p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={fetchWeather} style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-md)', display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <HiOutlineLocationMarker style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                <input
                  className="form-input"
                  placeholder="Enter city name (e.g., Mumbai, Delhi)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ paddingLeft: 40, width: '100%' }}
                  id="weather-location-input"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading} id="weather-search-btn">
                <HiOutlineSearch /> {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="no-results" style={{ padding: 'var(--space-xl)' }}>
              <div className="no-results-icon">⚠️</div>
              <p className="no-results-text">{error}</p>
            </div>
          )}

          {loading && (
            <div className="loader-container">
              <div className="loader-spinner" />
              <span className="loader-text">Fetching weather data...</span>
            </div>
          )}

          {weather && !loading && (
            <div className="weather-page-grid animate-fade-in-up">
              {/* Main Weather Card */}
              <div className="weather-page-main glass-card">
                <div className="weather-page-icon">{icon}</div>
                <div className="weather-page-temp">{weather.temperature}°C</div>
                <div className="weather-page-city">{weather.location}</div>
                <div className="weather-page-desc">{weather.description}</div>
              </div>

              {/* Detail Cards */}
              <div className="weather-page-card glass-card">
                <WiThermometer className="weather-page-card-icon" />
                <div className="weather-page-card-label">Feels Like</div>
                <div className="weather-page-card-value">{weather.feelsLike}°C</div>
              </div>

              <div className="weather-page-card glass-card">
                <WiHumidity className="weather-page-card-icon" />
                <div className="weather-page-card-label">Humidity</div>
                <div className="weather-page-card-value">{weather.humidity}%</div>
              </div>

              <div className="weather-page-card glass-card">
                <WiStrongWind className="weather-page-card-icon" />
                <div className="weather-page-card-label">Wind Speed</div>
                <div className="weather-page-card-value">{weather.windSpeed} m/s</div>
              </div>

              <div className="weather-page-card glass-card">
                <WiRain className="weather-page-card-icon" />
                <div className="weather-page-card-label">Rain Prediction</div>
                <div className="weather-page-card-value" style={{ color: getRainPrediction()?.color }}>
                  {getRainPrediction()?.text}
                </div>
              </div>
            </div>
          )}

          {!weather && !loading && !error && (
            <div className="no-results">
              <div className="no-results-icon">🌤️</div>
              <p className="no-results-text">Enter a location to get started</p>
              <p className="no-results-sub">Search for any city to see current weather conditions.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default WeatherPage;
