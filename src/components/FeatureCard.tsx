import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group hover:border-blue-500/50 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} p-2.5 mb-6`}>
        <Icon className="w-full h-full text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;