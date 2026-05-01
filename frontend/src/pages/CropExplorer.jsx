import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { HiOutlineSearch, HiOutlineFilter } from 'react-icons/hi';

const CropExplorer = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');
  const [soilFilter, setSoilFilter] = useState('');
  const [filters, setFilters] = useState({ soilTypes: [], seasons: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cropsRes, filtersRes] = await Promise.all([
          api.get('/crops'),
          api.get('/crops/filters'),
        ]);
        setCrops(cropsRes.data.crops || []);
        setFiltered(cropsRes.data.crops || []);
        setFilters(filtersRes.data || { soilTypes: [], seasons: [] });
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = crops;
    if (search) {
      result = result.filter((c) =>
        c.cropName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (seasonFilter) {
      result = result.filter(
        (c) =>
          c.season?.some((s) => s.toLowerCase() === seasonFilter.toLowerCase()) ||
          c.season?.includes('All')
      );
    }
    if (soilFilter) {
      result = result.filter((c) =>
        c.soilType?.some((s) => s.toLowerCase() === soilFilter.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, seasonFilter, soilFilter, crops]);

  const GRADIENTS = [
    'var(--gradient-crop-1)', 'var(--gradient-crop-2)', 'var(--gradient-crop-3)',
    'var(--gradient-crop-4)', 'var(--gradient-crop-5)', 'var(--gradient-crop-6)',
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard" id="crop-explorer-page">
          <div className="dashboard-header">
            <div className="dashboard-header-left">
              <h1>Crop Explorer</h1>
              <p>Browse all available crops and learn about their requirements.</p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="explorer-filters glass-card" style={{ padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <HiOutlineSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
              <input
                className="form-input"
                placeholder="Search crops..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 40, width: '100%' }}
                id="crop-search-input"
              />
            </div>
            <select className="form-select" value={seasonFilter} onChange={(e) => setSeasonFilter(e.target.value)} id="season-filter">
              <option value="">All Seasons</option>
              {filters.seasons.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select className="form-select" value={soilFilter} onChange={(e) => setSoilFilter(e.target.value)} id="soil-filter">
              <option value="">All Soil Types</option>
              {filters.soilTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="loader-container">
              <div className="loader-spinner" />
              <span className="loader-text">Loading crops...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🌾</div>
              <p className="no-results-text">No crops found</p>
              <p className="no-results-sub">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="explorer-grid">
              {filtered.map((crop, i) => (
                <div
                  key={crop._id}
                  className="explorer-crop-card glass-card"
                  onClick={() => navigate(`/crop/${encodeURIComponent(crop.cropName)}`)}
                  style={{ cursor: 'pointer', animationDelay: `${i * 0.04}s` }}
                  id={`explorer-card-${i}`}
                >
                  <div className="explorer-crop-gradient" style={{ background: GRADIENTS[i % GRADIENTS.length] }} />
                  <div className="explorer-crop-body">
                    <h3 className="explorer-crop-name">{crop.cropName}</h3>
                    <p className="explorer-crop-desc">{crop.description}</p>
                    <div className="explorer-crop-tags">
                      {crop.season?.slice(0, 3).map((s) => (
                        <span key={s} className="explorer-tag">{s}</span>
                      ))}
                      <span className="explorer-tag water">💧 {crop.waterRequirement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CropExplorer;
