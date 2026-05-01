import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineLogout,
  HiOutlineCog,
} from 'react-icons/hi';

const ProfileMenu = ({ onOpenHistory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-wrapper" ref={menuRef}>
      <button
        className="profile-btn"
        onClick={() => setIsOpen(!isOpen)}
        id="profile-menu-btn"
        aria-label="Profile menu"
      >
        {getInitials(user?.name)}
      </button>

      {isOpen && (
        <div className="profile-dropdown" id="profile-dropdown">
          <div className="profile-header">
            <div className="profile-name">{user?.name || 'User'}</div>
            <div className="profile-email">{user?.email}</div>
          </div>

          <div className="profile-menu-items">
            {/* Theme Toggle */}
            <button
              className="profile-menu-item"
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              <div
                className={`theme-toggle-track ${theme === 'dark' ? 'active' : ''}`}
              >
                <div className="theme-toggle-thumb" />
              </div>
            </button>

            {/* Search History */}
            <button
              className="profile-menu-item"
              onClick={() => {
                onOpenHistory?.();
                setIsOpen(false);
              }}
              id="history-btn"
            >
              <HiOutlineClock />
              <span>Search History</span>
            </button>

            {/* Settings */}
            <button
              className="profile-menu-item"
              onClick={() => {
                navigate('/settings');
                setIsOpen(false);
              }}
              id="settings-btn"
            >
              <HiOutlineCog />
              <span>Settings</span>
            </button>

            {/* About Us */}
            <button
              className="profile-menu-item"
              onClick={() => {
                navigate('/about');
                setIsOpen(false);
              }}
              id="about-btn"
            >
              <HiOutlineInformationCircle />
              <span>About Us</span>
            </button>

            <div className="profile-menu-divider" />

            {/* Logout */}
            <button
              className="profile-menu-item danger"
              onClick={handleLogout}
              id="logout-btn"
            >
              <HiOutlineLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
