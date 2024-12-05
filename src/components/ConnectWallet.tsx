import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { setWallet, disconnectWallet } from '../store/walletSlice';
import { RootState } from '../store';
import { toast } from 'react-toastify';

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const { isConnected, address } = useSelector((state: RootState) => state.wallet);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      // Check if Petra wallet is installed
      if (!(window as any).petra) {
        toast.error('Please install Petra wallet');
        window.open('https://petra.app', '_blank');
        return;
      }

      setLoading(true);  // Set loading state to true when attempting to connect

      const wallet = (window as any).petra;
      const response = await wallet.connect();

      if (response) {
        const account = await wallet.account();
        if (account && account.address) {
          console.log(account)
          dispatch(setWallet({ address: account.address }));
          toast.success('Wallet connected successfully!');
        } else {
          toast.error('Failed to fetch account address');
        }
      } else {
        toast.error('Connection failed');
      }
    } catch (error) {
      toast.error('Failed to connect wallet');
      console.error(error);
    } finally {
      setLoading(false);  // Set loading state to false after attempt
    }
  };

  const handleDisconnect = () => {
    dispatch(disconnectWallet());
    toast.info('Wallet disconnected');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
        ${isConnected
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-blue-600 hover:bg-blue-700'
        }`}
      onClick={isConnected ? handleDisconnect : connectWallet}
      disabled={loading}  // Disable the button when loading
    >
      <Wallet className="w-5 h-5" />
      <span>
        {loading
          ? 'Connecting...'
          : isConnected
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : 'Connect Petra Wallet'
        }
      </span>
    </motion.button>
  );
};

export default ConnectWallet;
