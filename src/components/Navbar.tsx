import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Wallet, Home, LayoutDashboard, History, BookOpen, ArrowLeftRight } from 'lucide-react';
import { RootState } from '../store';
import ConnectWallet from './ConnectWallet';
import NetworkBadge from './NetworkBadge';

const Navbar = () => {
  const location = useLocation();
  const isConnected = useSelector((state: RootState) => state.wallet.isConnected);

  const links = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transfer', icon: ArrowLeftRight, label: 'Transfer' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wallet className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">CoinSphere</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {links.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === path
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <NetworkBadge />
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;