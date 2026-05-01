import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import {
  HiOutlineArrowLeft,
  HiOutlineColorSwatch,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineBeaker,
} from 'react-icons/hi';
import { WiThermometer, WiRaindrop } from 'react-icons/wi';

const CropDetail = () => {
  const { cropName } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrop = async () => {
      setLoading(true);
      try {
        const res = await api.get('/crops');
        const found = res.data.crops?.find(
          (c) => c.cropName.toLowerCase() === decodeURIComponent(cropName).toLowerCase()
        );
        if (found) {
          setCrop(found);
        } else {
          setError('Crop not found');
        }
      } catch {
        setError('Failed to load crop data');
      } finally {
        setLoading(false);
      }
    };
    fetchCrop();
  }, [cropName]);

  const getWaterColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'var(--color-success)';
      case 'high': return 'var(--color-error)';
      default: return 'var(--color-warning)';
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard" id="crop-detail-page">
          <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 'var(--space-md)' }}>
            <HiOutlineArrowLeft /> Back
          </button>

          {loading ? (
            <div className="loader-container">
              <div className="loader-spinner" />
              <span className="loader-text">Loading crop details...</span>
            </div>
          ) : error ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <p className="no-results-text">{error}</p>
              <button className="btn btn-primary" onClick={() => navigate('/crop-explorer')} style={{ marginTop: 'var(--space-lg)' }}>
                Browse All Crops
              </button>
            </div>
          ) : crop ? (
            <div className="crop-detail-layout animate-fade-in-up">
              {/* Header */}
              <div className="crop-detail-header">
                <div>
                  <h1 className="crop-detail-name">{crop.cropName}</h1>
                  <p className="crop-detail-desc">{crop.description}</p>
                </div>
                <span
                  className="crop-detail-water-badge"
                  style={{ background: getWaterColor(crop.waterRequirement), color: '#fff' }}
                >
                  💧 {crop.waterRequirement} Water
                </span>
              </div>

              {/* Info Grid */}
              <div className="crop-detail-grid">
                <div className="crop-detail-card">
                  <div className="crop-detail-card-icon green"><HiOutlineColorSwatch /></div>
                  <div className="crop-detail-card-label">Suitable Soil Types</div>
                  <div className="crop-detail-card-value">{crop.soilType?.join(', ')}</div>
                </div>

                <div className="crop-detail-card">
                  <div className="crop-detail-card-icon amber"><HiOutlineLocationMarker /></div>
                  <div className="crop-detail-card-label">Growing Seasons</div>
                  <div className="crop-detail-card-value">{crop.season?.join(', ')}</div>
                </div>

                <div className="crop-detail-card">
                  <div className="crop-detail-card-icon blue"><WiThermometer style={{ fontSize: '1.4rem' }} /></div>
                  <div className="crop-detail-card-label">Temperature Range</div>
                  <div className="crop-detail-card-value">{crop.temperatureRange?.min}°C – {crop.temperatureRange?.max}°C</div>
                </div>

                <div className="crop-detail-card">
                  <div className="crop-detail-card-icon blue"><WiRaindrop style={{ fontSize: '1.4rem' }} /></div>
                  <div className="crop-detail-card-label">Water Requirement</div>
                  <div className="crop-detail-card-value">{crop.waterRequirement}</div>
                </div>

                <div className="crop-detail-card">
                  <div className="crop-detail-card-icon green"><HiOutlineClock /></div>
                  <div className="crop-detail-card-label">Growing Period</div>
                  <div className="crop-detail-card-value">{crop.growingPeriod}</div>
                </div>

                <div className="crop-detail-card">
                  <div className="crop-detail-card-icon amber"><HiOutlineBeaker /></div>
                  <div className="crop-detail-card-label">Recommended Fertilizers</div>
                  <div className="crop-detail-card-tags">
                    {crop.fertilizers?.map((f, i) => (
                      <span key={i} className="fertilizer-tag">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default CropDetail;
