import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RecommendationForm from '../components/RecommendationForm';
import WeatherWidget from '../components/WeatherWidget';
import CropCard from '../components/CropCard';
import SearchHistory from '../components/SearchHistory';
import {
  HiOutlineSearch,
  HiOutlineClock,
  HiOutlineTrendingUp,
  HiOutlineGlobe,
  HiOutlineColorSwatch,
  HiOutlineCalendar,
  HiOutlineArrowSmUp,
} from 'react-icons/hi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [stats, setStats] = useState({
    totalSearches: 0,
    cropsFound: 0,
    regions: 0,
    seasons: 0,
  });

  // Fetch stats from search history
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/history');
        const history = res.data.history || [];
        const uniqueLocations = new Set(history.map((h) => h.location));
        const uniqueSeasons = new Set(history.map((h) => h.season));
        const totalCrops = history.reduce(
          (sum, h) => sum + (h.cropNames?.length || 0),
          0
        );
        setStats({
          totalSearches: history.length,
          cropsFound: totalCrops,
          regions: uniqueLocations.size,
          seasons: uniqueSeasons.size,
        });
      } catch {
        // silently fail
      }
    };
    fetchStats();
  }, [results]);

  const handleSearch = async ({ location, soilType, season }) => {
    setLoading(true);
    setResults(null);

    try {
      const res = await api.post('/crops/recommend', { location, soilType, season });
      const data = res.data;

      if (data.recommendedCrops) {
        data.recommendedCrops.sort((a, b) => {
          if (a.isAbundant && !b.isAbundant) return -1;
          if (!a.isAbundant && b.isAbundant) return 1;
          return 0;
        });
      }

      setResults(data);

      if (data.weather) setWeather(data.weather);

      try {
        await api.post('/history', {
          location: data.location || location,
          soilType,
          season,
          temperature: data.currentTemperature,
          resultsCount: data.totalResults,
          cropNames: data.recommendedCrops?.map((c) => c.cropName) || [],
        });
      } catch (histErr) {
        console.error('History save error:', histErr);
      }

      if (data.recommendedCrops?.length > 0) {
        toast.success(`Found ${data.recommendedCrops.length} crop${data.recommendedCrops.length > 1 ? 's' : ''} for you! 🌱`);
      } else {
        toast('No crops matched your criteria. Try adjusting filters.', { icon: '🔍' });
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Error fetching recommendations';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Searches',
      value: stats.totalSearches,
      change: 'All time searches',
      icon: <HiOutlineSearch />,
      accent: true,
    },
    {
      label: 'Crops Found',
      value: stats.cropsFound,
      change: 'Unique recommendations',
      icon: <HiOutlineTrendingUp />,
    },
    {
      label: 'Active Regions',
      value: stats.regions,
      change: 'Locations explored',
      icon: <HiOutlineGlobe />,
    },
    {
      label: 'Seasons Covered',
      value: stats.seasons,
      change: 'Growing seasons',
      icon: <HiOutlineCalendar />,
    },
  ];

  const farmingTips = [
    {
      icon: '🌱',
      iconClass: 'green',
      title: 'Soil Health Check',
      subtitle: 'Test soil pH before planting',
    },
    {
      icon: '💧',
      iconClass: 'blue',
      title: 'Water Conservation',
      subtitle: 'Use drip irrigation for efficiency',
    },
    {
      icon: '🌤️',
      iconClass: 'amber',
      title: 'Weather Alerts',
      subtitle: 'Monitor forecasts for frost',
    },
    {
      icon: '🌿',
      iconClass: 'green',
      title: 'Crop Rotation',
      subtitle: 'Alternate crops each season',
    },
    {
      icon: '🐛',
      iconClass: 'amber',
      title: 'Pest Prevention',
      subtitle: 'Use organic pest controls',
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar onOpenHistory={() => setHistoryOpen(true)} />
      <div className="main-content">
        <Navbar onOpenHistory={() => setHistoryOpen(true)} />

        <main className="dashboard" id="dashboard-page">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="dashboard-header-left">
              <h1>Dashboard</h1>
              <p>Find the best crops for your land with smart recommendations.</p>
            </div>
            <div className="dashboard-header-actions">
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById('location-input')?.focus()}
              >
                <HiOutlineSearch /> Search Crops
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setHistoryOpen(true)}
              >
                <HiOutlineClock /> View History
              </button>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="stat-cards-row">
            {statCards.map((card, i) => (
              <div
                key={i}
                className={`stat-card ${card.accent ? 'accent' : ''}`}
                id={`stat-card-${i}`}
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">{card.label}</span>
                  <button className="stat-card-icon-btn">
                    <HiOutlineArrowSmUp />
                  </button>
                </div>
                <div className="stat-card-value">{card.value}</div>
                <div className="stat-card-change">
                  <span className="positive">↗</span> {card.change}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid: Form + Weather + Tips */}
          <div className="dashboard-grid">
            {/* Recommendation Form — spans 2 cols */}
            <div className="form-card-wrapper" style={{ animation: 'fadeInUp 0.6s ease' }}>
              <RecommendationForm onSubmit={handleSearch} loading={loading} />
            </div>

            {/* Weather Widget — 1 col */}
            <div style={{ animation: 'fadeInUp 0.7s ease' }}>
              <WeatherWidget weather={weather} />
            </div>





            {/* Results */}
            {(results || loading) && (
              <div className="results-section animate-fade-in-up">
                {loading ? (
                  <div style={{ padding: '48px 0' }}>
                    <div className="loader-container">
                      <div className="loader-spinner" />
                      <span className="loader-text">Analyzing soil, weather &amp; crop data...</span>
                    </div>
                  </div>
                ) : results && results.recommendedCrops ? (
                  <>
                    <div className="results-header">
                      <h2 className="results-title">Recommended Crops for {results.location}</h2>
                      <span className="results-count">
                        {results.totalResults} result{results.totalResults !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {results.recommendedCrops.length > 0 ? (
                      <div className="results-grid">
                        {results.recommendedCrops.map((crop, i) => (
                          <CropCard key={crop._id} crop={crop} index={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <p className="no-results-text">No crops found</p>
                        <p className="no-results-sub">
                          Try changing your soil type, season, or location for better results.
                        </p>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            )}

            {/* Bottom Row: Tips & Season Guide Side by Side */}
            <div className="bottom-cards-wrapper" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
              
              {/* Farming Tips Card */}
              <div className="dashboard-card" style={{ animation: 'fadeInUp 0.8s ease' }}>
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">Farming Tips</h3>
                  <span className="dashboard-card-action" onClick={() => navigate('/soil-health')} style={{ cursor: 'pointer' }}>View All →</span>
                </div>
                <div className="tips-list">
                  {farmingTips.map((tip, i) => (
                    <div key={i} className="tip-item" onClick={() => navigate('/soil-health')} style={{ cursor: 'pointer' }}>
                      <div className={`tip-icon ${tip.iconClass}`}>
                        {tip.icon}
                      </div>
                      <div className="tip-content">
                        <div className="tip-title">{tip.title}</div>
                        <div className="tip-subtitle">{tip.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Season Guide Card */}
              <div className="dashboard-card" style={{ animation: 'fadeInUp 0.85s ease' }}>
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">Season Guide</h3>
                  <span className="dashboard-card-action" onClick={() => navigate('/season-guide')} style={{ cursor: 'pointer' }}>View All →</span>
                </div>
                <div className="tips-list">
                  {[
                    { icon: '🌾', title: 'Kharif Season', subtitle: 'June – October', iconClass: 'green' },
                    { icon: '❄️', title: 'Rabi Season', subtitle: 'October – March', iconClass: 'blue' },
                    { icon: '☀️', title: 'Zaid Season', subtitle: 'March – June', iconClass: 'amber' },
                    { icon: '🌻', title: 'Summer Crops', subtitle: 'April – July', iconClass: 'amber' },
                  ].map((item, i) => (
                    <div key={i} className="tip-item" onClick={() => navigate('/season-guide')} style={{ cursor: 'pointer' }}>
                      <div className={`tip-icon ${item.iconClass}`}>
                        {item.icon}
                      </div>
                      <div className="tip-content">
                        <div className="tip-title">{item.title}</div>
                        <div className="tip-subtitle">{item.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <SearchHistory
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onReSearch={handleSearch}
      />
    </div>
  );
};

export default Dashboard;
