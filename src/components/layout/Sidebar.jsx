import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Home, 
  BarChart2, 
  Activity, 
  User, 
  Settings, 
  LogOut,
  BookOpen,
  Award,
  Calendar
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Dashboard', to: '/dashboard', icon: BarChart2 },
    { name: 'Exercises', to: '/exercises', icon: Activity },
    { name: 'Workouts', to: '/workouts', icon: Calendar },
    { name: 'Progress', to: '/progress', icon: Award },
    { name: 'Learn', to: '/learn', icon: BookOpen },
  ];
  
  const userNavigation = [
    { name: 'Profile', to: '/profile', icon: User },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full flex flex-col bg-dark-lighter border-r border-gray-700 w-64">
      <div className="h-16 flex items-center px-4 border-b border-gray-700">
        <Link to="/" className="flex-shrink-0">
          <span className="text-white font-display text-xl font-bold">Pose<span className="text-primary">Trainer</span></span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex items-center px-4 py-3 rounded-md text-sm font-medium ${
                isActive(item.to)
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-dark-light hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        
        {user && (
          <div className="px-2 py-4 space-y-1 border-t border-gray-700">
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium ${
                  isActive(item.to)
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-dark-light hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 rounded-md text-sm font-medium text-gray-300 hover:bg-dark-light hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        )}
      </div>
      
      {user && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.name ? user.name.charAt(0) : "U"}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-400">
                {user.level || "Beginner"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;