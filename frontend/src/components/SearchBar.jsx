import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import api from '../services/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query)}`);
        setResults(res.data.results || []);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleResultClick = (result) => {
    setShowDropdown(false);
    setQuery('');
    if (result.type === 'crop') {
      navigate(`/crop/${encodeURIComponent(result.name)}`);
    } else {
      navigate(`/fertilizer/${encodeURIComponent(result.name)}`);
    }
  };

  return (
    <div className="navbar-search-container" ref={dropdownRef} style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
      <form onSubmit={handleSubmit} className="navbar-search" style={{ width: '100%', margin: 0, maxWidth: '100%' }}>
        <HiOutlineSearch className="navbar-search-icon" />
        <input
          className="navbar-search-input"
          type="text"
          placeholder="Search crops, fertilizers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query) setShowDropdown(true); }}
        />
        <div className="navbar-search-shortcut">⌘ F</div>
      </form>

      {showDropdown && query && (
        <div className="search-dropdown">
          {loading ? (
            <div className="search-dropdown-item">
              <span className="text-tertiary">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={`${item.type}-${item._id}`}
                className="search-dropdown-item"
                onClick={() => handleResultClick(item)}
              >
                <div className="search-dropdown-item-name">{item.name}</div>
                <div className={`search-dropdown-badge ${item.type}`}>
                  {item.type}
                </div>
              </div>
            ))
          ) : (
            <div className="search-dropdown-item">
              <span className="text-tertiary">No results found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
