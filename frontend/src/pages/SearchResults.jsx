import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryParam = useQuery().get('q') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(queryParam)}`);
        setResults(res.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (queryParam) fetchResults();
    else setLoading(false);
  }, [queryParam]);

  const handleNavigate = (item) => {
    if (item.type === 'crop') navigate(`/crop/${encodeURIComponent(item.name)}`);
    else navigate(`/fertilizer/${encodeURIComponent(item.name)}`);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard">
          <div className="dashboard-header">
            <div className="dashboard-header-left">
              <h1>Search Results</h1>
              <p>Results for "{queryParam}"</p>
            </div>
          </div>

          {loading ? (
            <div className="loader-container">
              <div className="loader-spinner" />
              <span className="loader-text">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-grid">
              {results.map((item, index) => (
                <div 
                  key={`${item.type}-${item._id}`} 
                  className="search-result-card glass-card animate-fade-in-up" 
                  onClick={() => handleNavigate(item)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="search-result-header">
                    <h3 className="search-result-title">{item.name}</h3>
                    <span className={`search-dropdown-badge ${item.type}`}>{item.type}</span>
                  </div>
                  <p className="search-result-desc">{item.description || 'No description available.'}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <p className="no-results-text">No results found for "{queryParam}"</p>
              <p className="no-results-sub">Try searching for different crops or fertilizers.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
