import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Coins, Zap, Globe } from 'lucide-react';
import { RootState } from '../store';
import WalletModal from '../components/WalletModal';
import HeroBackground from '../components/HeroBackground';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  const navigate = useNavigate();
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const isConnected = useSelector((state: RootState) => state.wallet.isConnected);

  const handleGetStarted = () => {
    if (isConnected) {
      navigate('/dashboard');
    } else {
      setWalletModalOpen(true);
    }
  };

  const stats = [
    { icon: Shield, label: 'Secure Transactions', value: '1M+' },
    { icon: Coins, label: 'Total Volume', value: '$2.5B+' },
    { icon: Globe, label: 'Active Users', value: '100K+' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Real-Time Settlement',
      description: 'Experience instant finality for e-commerce, payroll, and B2B payments.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Multi-signature protection and real-time fraud detection.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Globe,
      title: 'Cross-Platform Bridge',
      description: 'Seamlessly connect traditional finance with crypto.',
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <HeroBackground />
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              The Future of Stablecoin Settlement
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience lightning-fast, secure stablecoin transactions with CoinSphere's next-generation settlement platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="btn-primary"
            >
              <span>{isConnected ? 'Go to Dashboard' : 'Get Started'}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                whileHover={{ y: -5 }}
                className="card text-center"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-3xl font-bold mb-2">{value}</h3>
                <p className="text-gray-400">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Why Choose CoinSphere?
            </h2>
            <p className="text-xl text-gray-300">
              Experience the next evolution in stablecoin settlements with our enterprise-grade platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Payments?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses already using CoinSphere for their stablecoin settlement needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="btn-primary"
            >
              <span>{isConnected ? 'Go to Dashboard' : 'Start Now'}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnect={() => {
          setWalletModalOpen(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
};

export default Home;