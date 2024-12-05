import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Coins, Zap } from 'lucide-react';

const Learn = () => {
  const topics = [
    {
      icon: Coins,
      title: 'What are Stablecoins?',
      description: 'Learn about different types of stablecoins and their importance in the crypto ecosystem.',
    },
    {
      icon: Shield,
      title: 'Security Best Practices',
      description: 'Understand how to keep your assets safe and secure while using CoinSphere.',
    },
    {
      icon: Zap,
      title: 'Fast Settlements',
      description: 'Discover how CoinSphere enables lightning-fast stablecoin settlements.',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-400" />
        <h1 className="text-3xl font-bold mb-4">Learn About CoinSphere</h1>
        <p className="text-gray-400">
          Explore our comprehensive guides and tutorials to make the most of your CoinSphere experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:border-blue-500 transition-colors cursor-pointer"
          >
            <topic.icon className="w-8 h-8 text-blue-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
            <p className="text-gray-400">{topic.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">
            Connect your wallet and start experiencing the future of stablecoin settlements.
          </p>
          <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            Launch App
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Learn;