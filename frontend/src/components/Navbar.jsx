import { HiOutlineSearch } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';

const Navbar = ({ onOpenHistory }) => {
  const { user } = useAuth();

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        {/* Search Bar */}
        <SearchBar />

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* User section with avatar + name */}
          <div className="navbar-user-section">
            <div className="navbar-user-info">
              <span className="navbar-user-name">{user?.name || 'User'}</span>
              <span className="navbar-user-email">{user?.email || ''}</span>
            </div>
            <ProfileMenu onOpenHistory={onOpenHistory} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
