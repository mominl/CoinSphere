import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, BarChart3, ArrowRight } from 'lucide-react';
import { RootState } from '../store';
import WalletModal from '../components/WalletModal';
import TransactionChart from '../components/TransactionChart';

// Import stablecoin icons
// import USDCIcon from '../assets/icons/usdc.svg';
// import USDTIcon from '../assets/icons/usdt.svg';
// import TUSDIcon from '../assets/icons/tusd.svg';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance } = useSelector((state: RootState) => state.wallet);
  const [walletaddress, setwalletaddress] = useState('');
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [stableCoins, setStableCoins] = useState<{ [key: string]: number }>({
    USDC: 0,
    USDT: 0,
    TUSD: 0,
  });

  const fetchBalance = async (address: string) => {
    try {
      const response = await fetch(`https://fullnode.testnet.aptoslabs.com/v1/accounts/${address}/resources`);
      const data = await response.json();

      const accountResource = data.find((resource: any) =>
        resource.type.includes('0x1::coin::CoinStore')
      );

      if (accountResource) {
        const balance = accountResource.data.coin.value / 100000000;
        setWalletBalance(balance);
        console.log('Balance:', balance);
        return balance;
      } else {
        console.log('No balance found');
        return 0;
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  };

  const fetchAddress = async () => {
    const wallet = (window as any).petra;
    const account = await wallet.account();
    setwalletaddress(account.address);
    return account.address; // Return the address for further use
  };

  useEffect(() => {
    if (isConnected) {
      fetchAddress().then((address) => {
        fetchBalance(address);
      });
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">Please connect your wallet to view your dashboard</p>
          <WalletModal isOpen={true} onClose={() => navigate('/')} onConnect={() => {}} />
        </div>
      </div>
    );
  }

  const recentActivity = [
    { type: 'Deposit', amount: '1,000 USDC', time: '2 hours ago', icon: ArrowUpRight },
    { type: 'Withdraw', amount: '500 USDT', time: '5 hours ago', icon: ArrowDownLeft },
    { type: 'Deposit', amount: '2,500 USDC', time: '1 day ago', icon: ArrowUpRight },
  ];

  return (
    <div className="space-y-6">
      {/* Balance and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
          <p className="text-3xl font-bold text-blue-400">
            ${walletBalance !== null ? walletBalance : balance}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {address?.slice(0, 8)}...{address?.slice(-6)}
          </p>
        </motion.div>

        {/* Stablecoins Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-4">Stablecoins</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700">
              <div className="flex items-center space-x-4">
                {/* <img src={USDCIcon} alt="USDC Icon" className="w-6 h-6" /> */}
                <div>
                  <p className="font-medium">USDC</p>
                  <p className="text-sm text-gray-400">{stableCoins.USDC > 0 ? stableCoins.USDC : '0'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700">
              <div className="flex items-center space-x-4">
                {/* <img src={USDTIcon} alt="USDT Icon" className="w-6 h-6" /> */}
                <div>
                  <p className="font-medium">USDT</p>
                  <p className="text-sm text-gray-400">{stableCoins.USDT > 0 ? stableCoins.USDT : '0'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700">
              <div className="flex items-center space-x-4">
                {/* <img src={TUSDIcon} alt="TUSD Icon" className="w-6 h-6" /> */}
                <div>
                  <p className="font-medium">TUSD</p>
                  <p className="text-sm text-gray-400">{stableCoins.TUSD > 0 ? stableCoins.TUSD : '0'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Transaction Analytics</h2>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="h-64">
          <TransactionChart />
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <button
            onClick={() => navigate('/history')}
            className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map(({ type, amount, time, icon: Icon }, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-700">
              <div className="flex items-center space-x-4">
                <Icon className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="font-medium">{type}</p>
                  <p className="text-sm text-gray-400">{amount}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
