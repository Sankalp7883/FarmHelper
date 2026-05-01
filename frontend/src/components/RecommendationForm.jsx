import { useState, useEffect, useCallback } from 'react';
import {
  HiOutlineSearch,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import api from '../services/api';

const RecommendationForm = ({ onSubmit, loading }) => {
  const [location, setLocation] = useState('');
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');

  // Dynamic options from API
  const [soilOptions, setSoilOptions] = useState([]);
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [soilLoading, setSoilLoading] = useState(false);
  const [soilMatched, setSoilMatched] = useState(false);
  const [allSoilTypes, setAllSoilTypes] = useState([]);

  // Fetch available seasons and all soil types on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await api.get('/crops/filters');
        setSeasonOptions(res.data.seasons || []);
        setAllSoilTypes(res.data.soilTypes || []);
        setSoilOptions(res.data.soilTypes || []);
      } catch (err) {
        console.error('Error fetching filters:', err);
        // Fallback options
        setSeasonOptions(['Kharif', 'Rabi', 'Zaid', 'Summer', 'Winter']);
        const fallback = [
          'Alluvial',
          'Black soil',
          'Clay',
          'Laterite',
          'Loamy',
          'Red soil',
          'Sandy',
        ];
        setAllSoilTypes(fallback);
        setSoilOptions(fallback);
      }
    };
    fetchFilters();
  }, []);

  // Debounced location lookup for soil types
  useEffect(() => {
    if (!location || location.trim().length < 2) {
      // Reset to all soil types
      setSoilOptions(allSoilTypes);
      setSoilMatched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSoilLoading(true);
      try {
        const res = await api.get(
          `/crops/soils?location=${encodeURIComponent(location.trim())}`
        );
        setSoilOptions(res.data.soils || allSoilTypes);
        setSoilMatched(res.data.matched || false);

        // Auto-select first soil if matched and current selection not in options
        if (res.data.matched && res.data.soils?.length > 0) {
          if (!res.data.soils.includes(soilType)) {
            setSoilType(res.data.soils[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching soils:', err);
        setSoilOptions(allSoilTypes);
        setSoilMatched(false);
      } finally {
        setSoilLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [location, allSoilTypes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !soilType || !season) return;
    onSubmit({ location, soilType, season });
  };

  return (
    <div className="form-card glass-card" id="recommendation-form">
      <h2 className="form-card-title">
        <HiOutlineSearch /> Find Best Crops
      </h2>

      <form className="recommendation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="location-input">
            <HiOutlineLocationMarker
              style={{ display: 'inline', verticalAlign: 'middle' }}
            />{' '}
            Location
          </label>
          <input
            id="location-input"
            className="form-input"
            type="text"
            placeholder="e.g. Mumbai, Delhi, Bangalore..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {soilMatched && location.trim().length >= 2 && (
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--color-success)',
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              ✓ Soil types found for {location}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="soil-select">
              Soil Type
              {soilLoading && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-tertiary)',
                    fontWeight: 400,
                    marginLeft: 6,
                  }}
                >
                  (loading...)
                </span>
              )}
            </label>
            <select
              id="soil-select"
              className="form-select"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              required
            >
              <option value="">
                {soilMatched
                  ? 'Select local soil type'
                  : 'Select soil type'}
              </option>
              {soilOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                  {soilMatched ? ' ★' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="season-select">
              Season
            </label>
            <select
              id="season-select"
              className="form-select"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
            >
              <option value="">Select season</option>
              {seasonOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !location || !soilType || !season}
          id="search-btn"
        >
          {loading ? (
            <>
              <div
                className="loader-spinner"
                style={{ width: 20, height: 20, borderWidth: 2 }}
              />
              Searching...
            </>
          ) : (
            <>
              <HiOutlineSearch />
              Get Recommendations
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RecommendationForm;
