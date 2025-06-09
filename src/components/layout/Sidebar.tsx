import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  FileText,
  X,
  Book
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { hasPermission } = useAuth();

  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Home', requiredRole: 'viewer' },
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', requiredRole: 'viewer' },
    { to: '/controls', icon: <CheckSquare size={20} />, label: 'Controls', requiredRole: 'viewer' },
    { to: '/users', icon: <Users size={20} />, label: 'Users', requiredRole: 'admin' },
    { to: '/reports', icon: <FileText size={20} />, label: 'Reports', requiredRole: 'viewer' },
    { to: '/guide', icon: <Book size={20} />, label: 'User Guide', requiredRole: 'viewer' },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
    lg:translate-x-0 lg:static lg:h-screen
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex items-center justify-between lg:hidden">
          <h2 className="font-semibold text-lg">Navigation</h2>
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              hasPermission(item.requiredRole as any) && (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    onClick={() => closeSidebar()}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600">
              Check the <NavLink to="/guide" className="text-primary-600 hover:text-primary-800 font-medium" onClick={closeSidebar}>user guide</NavLink> or contact your administrator for support.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;