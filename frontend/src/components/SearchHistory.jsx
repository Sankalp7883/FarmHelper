import { useState, useEffect } from 'react';
import {
  HiOutlineX,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { WiThermometer } from 'react-icons/wi';
import api from '../services/api';
import toast from 'react-hot-toast';
import Loader from './Loader';

const SearchHistory = ({ isOpen, onClose, onReSearch }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
      setClosing(false);
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/history');
      setHistory(res.data.history || []);
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 280);
  };

  const handleClearAll = async () => {
    try {
      await api.delete('/history');
      setHistory([]);
      toast.success('History cleared');
    } catch (err) {
      toast.error('Error clearing history');
    }
  };

  const handleDeleteOne = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/history/${id}`);
      setHistory((prev) => prev.filter((h) => h._id !== id));
      toast.success('Entry removed');
    } catch (err) {
      toast.error('Error removing entry');
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="history-overlay" onClick={handleClose} />
      <div
        className={`history-panel ${closing ? 'closing' : ''}`}
        id="history-panel"
      >
        <div className="history-header">
          <h2 className="history-title">
            <HiOutlineClock
              style={{ display: 'inline', verticalAlign: 'middle' }}
            />{' '}
            Search History
          </h2>
          <button
            className="history-close-btn"
            onClick={handleClose}
            id="history-close-btn"
          >
            <HiOutlineX />
          </button>
        </div>

        <div className="history-body">
          {loading ? (
            <Loader text="Loading history..." />
          ) : history.length === 0 ? (
            <div className="history-empty">
              <div className="history-empty-icon">📋</div>
              <p style={{ fontWeight: 600 }}>No search history yet</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                Your crop searches will appear here
              </p>
            </div>
          ) : (
            history.map((item, i) => (
              <div
                key={item._id}
                className="history-item animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => {
                  onReSearch({
                    location: item.location,
                    soilType: item.soilType,
                    season: item.season,
                  });
                  handleClose();
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div className="history-item-location">
                    <HiOutlineLocationMarker
                      style={{
                        display: 'inline',
                        verticalAlign: 'middle',
                        marginRight: 4,
                      }}
                    />
                    {item.location}
                  </div>
                  <button
                    className="btn-ghost"
                    style={{
                      padding: 4,
                      borderRadius: 6,
                      fontSize: '0.85rem',
                      color: 'var(--color-text-tertiary)',
                    }}
                    onClick={(e) => handleDeleteOne(item._id, e)}
                    title="Remove"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
                <div className="history-item-details">
                  <span className="history-item-detail">🌱 {item.soilType}</span>
                  <span className="history-item-detail">📅 {item.season}</span>
                  {item.temperature && (
                    <span className="history-item-detail">
                      🌡️ {item.temperature}°C
                    </span>
                  )}
                </div>
                {item.cropNames && item.cropNames.length > 0 && (
                  <div className="history-item-crops">
                    Found: {item.cropNames.slice(0, 4).join(', ')}
                    {item.cropNames.length > 4 &&
                      ` +${item.cropNames.length - 4} more`}
                  </div>
                )}
                <div className="history-item-time">
                  {formatDate(item.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="history-footer">
            <button
              className="btn btn-danger"
              style={{ width: '100%', fontSize: '0.85rem' }}
              onClick={handleClearAll}
              id="clear-history-btn"
            >
              <HiOutlineTrash /> Clear All History
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchHistory;
