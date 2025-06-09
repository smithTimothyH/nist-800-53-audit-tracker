import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-primary-700 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Shield size={28} className="text-accent-400" />
              <h1 className="text-xl font-semibold">NIST 800-53 Audit Tracker</h1>
            </div>
          </div>
          
          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="text-right">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-300 capitalize">{currentUser.role}</p>
                </div>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                    <User size={20} />
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-primary-700 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;