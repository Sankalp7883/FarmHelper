import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineHome,
  HiOutlineGlobe,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineCog,
  HiOutlineLogout,
} from 'react-icons/hi';

const Sidebar = ({ onOpenHistory }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <HiOutlineHome />, label: 'Dashboard', path: '/' },
    { icon: <HiOutlineGlobe />, label: 'Crop Explorer', path: '/crop-explorer' },
    { icon: <HiOutlineChartBar />, label: 'Weather Data', path: '/weather' },
    { icon: <HiOutlineClock />, label: 'Search History', action: onOpenHistory },
  ];

  const generalItems = [
    { icon: <HiOutlineCog />, label: 'Settings', path: '/settings' },
    { icon: <HiOutlineInformationCircle />, label: 'About Us', path: '/about' },
  ];

  return (
    <aside className="sidebar" id="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🌾</div>
        <span className="sidebar-brand-text">FarmHelper</span>
      </div>

      <nav className="sidebar-nav">
        {/* MENU Section */}
        <div className="sidebar-section-title">Menu</div>
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => item.path ? navigate(item.path) : item.action?.()}
            id={`sidebar-item-${i}`}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}

        {/* GENERAL Section */}
        <div className="sidebar-section-title" style={{ marginTop: 8 }}>General</div>
        {generalItems.map((item, i) => (
          <button
            key={i}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => item.path ? navigate(item.path) : item.action?.()}
            id={`sidebar-tool-${i}`}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <button
          className="sidebar-item"
          onClick={handleLogout}
          id="sidebar-logout"
          style={{ color: 'var(--color-error)', marginTop: 4 }}
        >
          <span className="sidebar-item-icon"><HiOutlineLogout /></span>
          Logout
        </button>
      </nav>

      {/* Footer — User Info */}
      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={() => navigate('/settings')}>
          <div className="sidebar-avatar">{getInitials(user?.name)}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'User'}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
