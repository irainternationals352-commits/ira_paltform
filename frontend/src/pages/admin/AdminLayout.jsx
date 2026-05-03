import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaTachometerAlt, FaUsers, FaUniversity, FaGlobeAmericas, FaBriefcase, FaSignOutAlt, FaGraduationCap } from 'react-icons/fa';

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: FaTachometerAlt },
    { name: 'Leads (Enquiries)', path: '/admin-dashboard/leads', icon: FaUsers },
    { name: 'Universities', path: '/admin-dashboard/universities', icon: FaUniversity },
    { name: 'Countries', path: '/admin-dashboard/countries', icon: FaGlobeAmericas },
    { name: 'Services', path: '/admin-dashboard/services', icon: FaBriefcase },
    { name: 'Programs', path: '/admin-dashboard/programs', icon: FaGraduationCap },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 text-white flex flex-col shadow-2xl z-20 hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Admin<span className="text-primary-500">Panel</span></h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-primary-600 text-white font-bold shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white font-medium'
                }`}
              >
                <item.icon className={isActive ? 'text-white' : 'text-gray-500'} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors font-bold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-bold text-dark-900">
            {navItems.find(i => location.pathname === i.path || location.pathname.startsWith(i.path + '/'))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Logged in as Admin</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
