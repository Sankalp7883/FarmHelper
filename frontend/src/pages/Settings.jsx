import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import {
  HiOutlineUser,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineLocationMarker,
  HiOutlineBell,
} from 'react-icons/hi';

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [username, setUsername] = useState(user?.name || '');
  const [locationPref, setLocationPref] = useState(
    localStorage.getItem('farmhelper-location') || ''
  );
  const [notifications, setNotifications] = useState(
    localStorage.getItem('farmhelper-notifications') !== 'false'
  );

  const handleSaveProfile = () => {
    // Update user in localStorage
    const userData = JSON.parse(localStorage.getItem('farmhelper-user') || '{}');
    userData.name = username;
    localStorage.setItem('farmhelper-user', JSON.stringify(userData));
    toast.success('Profile updated! Changes will reflect on next login.');
  };

  const handleSaveLocation = () => {
    localStorage.setItem('farmhelper-location', locationPref);
    toast.success('Location preference saved!');
  };

  const handleToggleNotifications = () => {
    const newVal = !notifications;
    setNotifications(newVal);
    localStorage.setItem('farmhelper-notifications', String(newVal));
    toast.success(newVal ? 'Notifications enabled' : 'Notifications disabled');
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard" id="settings-page">
          <div className="dashboard-header">
            <div className="dashboard-header-left">
              <h1>Settings</h1>
              <p>Manage your account preferences and application settings.</p>
            </div>
          </div>

          <div className="settings-grid">
            {/* Profile Section */}
            <div className="settings-card glass-card">
              <div className="settings-card-header">
                <HiOutlineUser className="settings-card-icon" />
                <h2 className="settings-card-title">Profile</h2>
              </div>
              <div className="settings-card-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-username">Display Name</label>
                  <input
                    id="settings-username"
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleSaveProfile} style={{ marginTop: 'var(--space-lg)' }} id="save-profile-btn">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Appearance */}
            <div className="settings-card glass-card">
              <div className="settings-card-header">
                {theme === 'dark' ? <HiOutlineMoon className="settings-card-icon" /> : <HiOutlineSun className="settings-card-icon" />}
                <h2 className="settings-card-title">Appearance</h2>
              </div>
              <div className="settings-card-body">
                <div className="settings-toggle-row">
                  <div>
                    <div className="settings-toggle-label">Dark Mode</div>
                    <div className="settings-toggle-desc">Switch between light and dark themes</div>
                  </div>
                  <div
                    className={`theme-toggle-track ${theme === 'dark' ? 'active' : ''}`}
                    onClick={toggleTheme}
                    id="settings-theme-toggle"
                  >
                    <div className="theme-toggle-thumb" />
                  </div>
                </div>
                <p className="settings-current" style={{ marginTop: 'var(--space-md)' }}>
                  Current theme: <strong>{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</strong>
                </p>
              </div>
            </div>

            {/* Location Preference */}
            <div className="settings-card glass-card">
              <div className="settings-card-header">
                <HiOutlineLocationMarker className="settings-card-icon" />
                <h2 className="settings-card-title">Location</h2>
              </div>
              <div className="settings-card-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-location">Default Location</label>
                  <input
                    id="settings-location"
                    className="form-input"
                    type="text"
                    value={locationPref}
                    onChange={(e) => setLocationPref(e.target.value)}
                    placeholder="e.g., Mumbai, Delhi"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: 4 }}>
                    Used as default for weather and crop suggestions.
                  </span>
                </div>
                <button className="btn btn-primary" onClick={handleSaveLocation} style={{ marginTop: 'var(--space-lg)' }} id="save-location-btn">
                  Save Location
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="settings-card glass-card">
              <div className="settings-card-header">
                <HiOutlineBell className="settings-card-icon" />
                <h2 className="settings-card-title">Notifications</h2>
              </div>
              <div className="settings-card-body">
                <div className="settings-toggle-row">
                  <div>
                    <div className="settings-toggle-label">Enable Notifications</div>
                    <div className="settings-toggle-desc">Receive alerts about weather and crop updates</div>
                  </div>
                  <div
                    className={`theme-toggle-track ${notifications ? 'active' : ''}`}
                    onClick={handleToggleNotifications}
                    id="settings-notif-toggle"
                  >
                    <div className="theme-toggle-thumb" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
