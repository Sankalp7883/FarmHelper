import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const SoilHealth = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: '🧪',
      title: 'Why Test Your Soil?',
      content: [
        'Understanding soil composition helps you select the right crops.',
        'Soil testing reveals nutrient deficiencies that can be corrected.',
        'Proper pH levels (6.0–7.0 for most crops) are essential for nutrient absorption.',
        'Testing reduces over-fertilization, saving money and protecting the environment.',
      ],
    },
    {
      icon: '📋',
      title: 'How to Test Soil pH',
      content: [
        'Step 1: Collect samples from 6–8 spots across your field at a depth of 15 cm.',
        'Step 2: Mix samples in a clean bucket and take about 500g.',
        'Step 3: Dry the sample in shade for 24 hours.',
        'Step 4: Use a pH testing kit or send to a local soil testing lab.',
        'Step 5: Record results and compare with ideal ranges for your target crops.',
      ],
    },
    {
      icon: '🌿',
      title: 'Improving Soil Health',
      content: [
        'Add organic matter (compost, manure) to improve structure and nutrients.',
        'Practice crop rotation to prevent nutrient depletion.',
        'Use cover crops during off-seasons to prevent erosion.',
        'Apply lime to acidic soils or sulfur to alkaline soils to adjust pH.',
        'Reduce tillage to preserve beneficial soil organisms.',
      ],
    },
    {
      icon: '🪱',
      title: 'Signs of Healthy Soil',
      content: [
        'Rich, dark color indicating high organic matter.',
        'Crumbly texture that holds moisture but drains well.',
        'Presence of earthworms and beneficial organisms.',
        'Sweet, earthy smell (no foul odors).',
        'Strong root development in crops.',
      ],
    },
    {
      icon: '⚠️',
      title: 'Common Soil Problems',
      content: [
        'Compaction: Heavy machinery causes dense soil — aerate regularly.',
        'Salinity: Over-irrigation leads to salt buildup — improve drainage.',
        'Erosion: Wind and water remove topsoil — plant windbreaks and cover crops.',
        'Nutrient Deficiency: Yellowing leaves indicate nitrogen or iron shortage.',
        'Waterlogging: Poor drainage — add sand or create raised beds.',
      ],
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard" id="soil-health-page">
          <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 'var(--space-md)' }}>
            <HiOutlineArrowLeft /> Back
          </button>

          <div className="dashboard-header" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="dashboard-header-left">
              <h1>🌱 Soil Health Check</h1>
              <p>Everything you need to know about testing and improving soil health for better yields.</p>
            </div>
          </div>

          <div className="info-page-grid">
            {sections.map((section, i) => (
              <div key={i} className="info-section-card glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="info-section-header">
                  <span className="info-section-icon">{section.icon}</span>
                  <h2 className="info-section-title">{section.title}</h2>
                </div>
                <ul className="info-section-list">
                  {section.content.map((item, j) => (
                    <li key={j} className="info-section-item">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SoilHealth;
