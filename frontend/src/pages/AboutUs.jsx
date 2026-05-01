import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const features = [
  { icon: '🌾', title: 'Smart Crop Recommendations', desc: 'Get personalized crop suggestions based on your location, soil type, season, and real-time weather data.' },
  { icon: '🧪', title: 'Fertilizer Guidance', desc: 'Know exactly which fertilizers to use for each recommended crop to maximize yield and efficiency.' },
  { icon: '🌤️', title: 'Live Weather Integration', desc: 'Real-time weather data from OpenWeatherMap ensures recommendations match current climate conditions.' },
  { icon: '📊', title: 'Search History', desc: 'Track all your past searches and quickly re-run recommendations with a single click.' },
  { icon: '🌍', title: 'Location-Aware', desc: 'Enter any city and get temperature-adjusted crop recommendations with auto-detected soil types.' },
  { icon: '🔒', title: 'Secure & Personal', desc: 'Your account and search history are protected with industry-standard JWT authentication.' },
];

const AboutUs = () => {
  return (
    <div className="app-layout">
      <Sidebar onOpenHistory={() => {}} />
      <div className="main-content">
        <Navbar onOpenHistory={() => {}} />

        <main className="about-page" id="about-page">
          <div className="about-hero">
            <h1 className="about-hero-title">
              About <span className="dashboard-title-accent">FarmHelper</span>
            </h1>
            <p className="about-hero-desc">
              FarmHelper is an intelligent agricultural assistant designed to
              empower farmers with data-driven crop recommendations. We combine
              real-time weather data, soil science, and seasonal patterns to help
              farmers make the most informed decisions.
            </p>
          </div>

          <div className="about-features">
            {features.map((f, i) => (
              <div
                key={i}
                className="about-feature-card animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="about-feature-icon">{f.icon}</div>
                <h3 className="about-feature-title">{f.title}</h3>
                <p className="about-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="about-team">
            <h2 className="about-section-title">
              Our <span className="dashboard-title-accent">Mission</span>
            </h2>
            <div className="about-mission">
              <p>Agriculture is the backbone of civilizations, yet millions of farmers struggle to optimize their crop choices due to lack of accessible, data-driven tools. FarmHelper bridges this gap by providing a free, easy-to-use platform that combines weather data, soil science, and crop databases.</p>
              <br />
              <p>Our vision is to make smart agriculture accessible to every farmer — from smallholders in rural India to commercial growers worldwide.</p>
              <br />
              <p style={{ textAlign: 'center', marginTop: 16 }}>
                <Link to="/" className="btn btn-primary" id="back-to-dashboard-btn">
                  ← Back to Dashboard
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
