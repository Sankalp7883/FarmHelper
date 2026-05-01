import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { HiOutlineArrowLeft, HiOutlineBeaker, HiOutlineInformationCircle, HiOutlineLightningBolt } from 'react-icons/hi';
import api from '../services/api';

const FertilizerDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [fertilizer, setFertilizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFertilizer = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/fertilizers/${encodeURIComponent(name)}`);
        setFertilizer(res.data);
      } catch (err) {
        console.error(err);
        setError('Fertilizer not found. Please try searching again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFertilizer();
  }, [name]);

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <main className="dashboard flex-center">
            <div className="loader-container">
              <div className="loader-spinner" />
              <span className="loader-text">Loading Details...</span>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !fertilizer) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <main className="dashboard">
            <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 'var(--space-md)' }}>
              <HiOutlineArrowLeft /> Back
            </button>
            <div className="no-results">
              <div className="no-results-icon">⚠️</div>
              <p className="no-results-text">{error}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard crop-detail-layout animate-fade-in-up">
          <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 'var(--space-md)' }}>
            <HiOutlineArrowLeft /> Back
          </button>

          <div className="crop-detail-header">
            <div>
              <h1 className="crop-detail-name">{fertilizer.name}</h1>
              <p className="crop-detail-desc">{fertilizer.description}</p>
            </div>
            <div className={`crop-detail-water-badge ${fertilizer.type === 'Organic' ? 'badge-low' : 'badge-high'}`}>
              {fertilizer.type === 'Organic' ? '🌱 Organic' : '🧪 Chemical'}
            </div>
          </div>

          <div className="crop-detail-grid">
            <div className="crop-detail-card">
              <div className="crop-detail-card-icon green">
                <HiOutlineInformationCircle />
              </div>
              <div className="crop-detail-card-label">Type</div>
              <div className="crop-detail-card-value">{fertilizer.type}</div>
            </div>

            <div className="crop-detail-card">
              <div className="crop-detail-card-icon amber">
                <HiOutlineBeaker />
              </div>
              <div className="crop-detail-card-label">Nutrients Provided</div>
              <div className="crop-detail-card-value">
                <div className="crop-detail-card-tags">
                  {fertilizer.nutrients?.map((nutrient, i) => (
                    <span key={i} className="explorer-tag">{nutrient}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="crop-detail-card" style={{ gridColumn: '1 / -1' }}>
              <div className="crop-detail-card-icon blue">
                <HiOutlineLightningBolt />
              </div>
              <div className="crop-detail-card-label">Usage Tips & Best Practices</div>
              <ul className="info-section-list" style={{ marginTop: 'var(--space-sm)' }}>
                {fertilizer.usageTips?.map((tip, i) => (
                  <li key={i} className="info-section-item" style={{ color: 'var(--color-text-primary)' }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FertilizerDetail;
