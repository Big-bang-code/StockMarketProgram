import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            财富管家
          </Link>

          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              首页
            </Link>
            <Link
              to="/records"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive('/records')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              记录管理
            </Link>
            <Link
              to="/analysis"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive('/analysis')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              数据分析
            </Link>
            <Link
              to="/settings"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive('/settings')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              设置
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
