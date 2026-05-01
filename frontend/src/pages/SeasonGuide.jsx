import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const SeasonGuide = () => {
  const navigate = useNavigate();

  const seasons = [
    {
      icon: '🌾',
      name: 'Kharif Season',
      period: 'June – October',
      color: 'var(--color-success)',
      description: 'The monsoon cropping season. Crops are sown at the beginning of the monsoon and harvested at the end.',
      crops: ['Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Groundnut', 'Tur (Pigeon Pea)', 'Jute', 'Millets'],
      tips: [
        'Start sowing with the onset of monsoon rains.',
        'Ensure proper drainage to prevent waterlogging.',
        'Watch for pest outbreaks during humid conditions.',
        'Apply fertilizers before or during early growth stages.',
        'Harvest before winter to avoid frost damage.',
      ],
    },
    {
      icon: '❄️',
      name: 'Rabi Season',
      period: 'October – March',
      color: 'var(--color-info)',
      description: 'The winter cropping season. Crops need cool weather for growth and warm weather for seed germination.',
      crops: ['Wheat', 'Mustard', 'Barley', 'Potato', 'Gram (Chickpea)', 'Onion', 'Sunflower'],
      tips: [
        'Sow after the monsoon recedes and soil retains moisture.',
        'Irrigate at critical growth stages — flowering and grain filling.',
        'Protect crops from frost using mulch or smoke screens.',
        'Apply basal fertilizer during land preparation.',
        'Harvest before onset of summer heat.',
      ],
    },
    {
      icon: '☀️',
      name: 'Zaid Season',
      period: 'March – June',
      color: 'var(--color-warning)',
      description: 'A short summer cropping season between Rabi and Kharif. Crops need hot weather and irrigation.',
      crops: ['Watermelon', 'Muskmelon', 'Cucumber', 'Tomato', 'Millets', 'Maize', 'Sunflower'],
      tips: [
        'Use irrigation since there is no natural rain.',
        'Select quick-maturing varieties to fit the short window.',
        'Mulch heavily to conserve soil moisture.',
        'Provide shade nets for sensitive crops.',
        'Harvest before the monsoon arrives.',
      ],
    },
    {
      icon: '🌻',
      name: 'Summer Crops',
      period: 'April – July',
      color: 'var(--color-warning)',
      description: 'Certain crops thrive in peak summer heat with adequate irrigation.',
      crops: ['Tomato', 'Onion', 'Sunflower', 'Maize'],
      tips: [
        'Ensure consistent irrigation — drip systems work best.',
        'Use heat-tolerant crop varieties.',
        'Apply organic mulch to maintain soil temperature.',
        'Monitor for heat stress symptoms in plants.',
        'Plan harvest timing to avoid monsoon damage.',
      ],
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard" id="season-guide-page">
          <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 'var(--space-md)' }}>
            <HiOutlineArrowLeft /> Back
          </button>

          <div className="dashboard-header" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="dashboard-header-left">
              <h1>📅 Season Guide</h1>
              <p>Understand Indian agricultural seasons and plan your crops accordingly.</p>
            </div>
          </div>

          <div className="season-guide-grid">
            {seasons.map((season, i) => (
              <div key={i} className="season-guide-card glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="season-guide-header" style={{ borderColor: season.color }}>
                  <span className="season-guide-icon">{season.icon}</span>
                  <div>
                    <h2 className="season-guide-name">{season.name}</h2>
                    <span className="season-guide-period" style={{ color: season.color }}>{season.period}</span>
                  </div>
                </div>

                <p className="season-guide-desc">{season.description}</p>

                <div className="season-guide-section">
                  <h3 className="season-guide-section-title">Common Crops</h3>
                  <div className="season-guide-tags">
                    {season.crops.map((crop) => (
                      <span
                        key={crop}
                        className="explorer-tag"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/crop/${encodeURIComponent(crop)}`)}
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="season-guide-section">
                  <h3 className="season-guide-section-title">Best Practices</h3>
                  <ul className="info-section-list">
                    {season.tips.map((tip, j) => (
                      <li key={j} className="info-section-item">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SeasonGuide;
