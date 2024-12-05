import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Twitter, 
  Github, 
  Linkedin, 
  Mail,
  ArrowUpRight,
  Globe,
  Shield,
  BookOpen
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Transfer', href: '/transfer' },
    { label: 'History', href: '/history' },
    { label: 'Learn', href: '/learn' },
  ];

  const resources = [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status Page', href: '#' },
    { label: 'Security', href: '#' },
  ];

  const company = [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press Kit', href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <footer className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Wallet className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">CoinSphere</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Revolutionizing stablecoin settlements with enterprise-grade solutions for modern businesses.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-gray-400 hover:text-white flex items-center group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-gray-400 hover:text-white flex items-center group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-gray-400 hover:text-white flex items-center group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div variants={itemVariants} className="flex items-center space-x-6">
              <span className="text-gray-400">© 2024 CoinSphere. All rights reserved.</span>
              <Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Terms of Service</Link>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <Globe className="w-5 h-5 text-gray-400" />
              <select className="bg-gray-700 rounded-lg px-3 py-1 text-sm border-none focus:ring-2 focus:ring-blue-500">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;