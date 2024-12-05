import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store';

const NetworkBadge = () => {
  const network = useSelector((state: RootState) => state.wallet.network);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`px-3 py-1 rounded-full text-sm font-medium
        ${network === 'mainnet'
          ? 'bg-green-500/20 text-green-400'
          : 'bg-yellow-500/20 text-yellow-400'
        }`}
    >
      {network === 'mainnet' ? 'Mainnet' : 'Testnet'}
    </motion.div>
  );
};

export default NetworkBadge;