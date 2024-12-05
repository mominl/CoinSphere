import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { 
  ArrowRight, 
  Wallet, 
  RefreshCcw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { RootState } from '../store';
import { AptosClient } from 'aptos';

const client = new AptosClient('https://fullnode.testnet.aptoslabs.com');
const MODULE_ADDRESS = '0x1';

const Transfer = () => {
  const { address, isConnected } = useSelector((state: RootState) => state.wallet);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [walletaddress, setwalletaddress] = useState('');
  const [selectedToken, setSelectedToken] = useState('APT'); // Default to APT

  const TOKENS = {
    APT: '0x1::aptos_coin::AptosCoin',
    USDC: '0x1::usdc_coin::USDC', // Example stablecoin, replace with actual if different
  };

  const fetchAddress = async () => {
    const wallet = (window as any).petra;
    const account = await wallet.account();
    setwalletaddress(account.address);
  };

  const fetchBalance = async (address: string) => {
    try {
      const response = await fetch(`https://fullnode.testnet.aptoslabs.com/v1/accounts/${address}/resources`);
      const data = await response.json();
      const accountResource = data.find((resource: any) =>
        resource.type.includes(`0x1::coin::CoinStore<${TOKENS[selectedToken as keyof typeof TOKENS]}>`)
      );

      if (accountResource) {
        const balance = accountResource.data.coin.value / 100000000;
        setBalance(balance);
        console.log('Balance:', balance);
        return balance;
      } else {
        console.log('No balance found for', selectedToken);
        return 0;
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  };

  const transferTokens = async (recipientAddress: string, amount: number) => {
    const transactionPayload = {
      type: 'entry_function_payload',
      function: '0x1::coin::transfer',
      type_arguments: [TOKENS[selectedToken as keyof typeof TOKENS]],
      arguments: [recipientAddress, amount.toString()],
    };

    try {
      if (typeof window !== 'undefined' && 'petra' in window) {
        const response = await (window as any).petra.signAndSubmitTransaction(transactionPayload);

        console.log('Transaction submitted:', response.hash);

        const txnDetails = await client.waitForTransaction(response.hash);
        console.log('Transaction confirmed:', txnDetails);
      } else {
        console.error('Petra Wallet not detected');
      }
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchAddress();
      fetchBalance(walletaddress);
    }
  }, [isConnected, walletaddress, selectedToken]);

  const formik = useFormik({
    initialValues: {
      recipient: '',
      amount: 0,
      operation: 'transfer',
    },
    validationSchema: Yup.object({
      recipient: Yup.string()
        .matches(/^0x[a-fA-F0-9]{64}$/, 'Invalid Aptos address')
        .required('Required'),
      amount: Yup.number()
        .positive('Must be positive')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!window.petra || !address) {
        toast.error('Please connect your wallet first');
        return;
      }

      setIsLoading(true);
      try {
        await transferTokens(values.recipient, values.amount * 100000000);
        toast.success('Transfer successful!');
        resetForm();
        fetchBalance(walletaddress);
      } catch (error) {
        console.error('Transaction failed:', error);
        toast.error('Transaction failed. Please try again.');
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to make transfers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transfer Coins</h1>
          <button
            onClick={() => fetchBalance(walletaddress)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="mb-8 p-4 bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Your Balance ({selectedToken})</span>
            <span className="text-xl font-bold">{balance} {selectedToken}</span>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="token" className="block text-sm font-medium mb-2">
              Select Token
            </label>
            <select
              id="token"
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="input w-full"
            >
              <option value="APT">APT</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <div>
            <label htmlFor="recipient" className="block text-sm font-medium mb-2">
              Recipient Address
            </label>
            <input
              id="recipient"
              type="text"
              {...formik.getFieldProps('recipient')}
              className="input w-full"
              placeholder="0x..."
            />
            {formik.touched.recipient && formik.errors.recipient && (
              <div className="text-red-400 text-sm mt-1">{formik.errors.recipient}</div>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount ({selectedToken})
            </label>
            <input
              id="amount"
              type="number"
              step="0.000001"
              {...formik.getFieldProps('amount')}
              className="input w-full"
              placeholder="0.00"
            />
            {formik.touched.amount && formik.errors.amount && (
              <div className="text-red-400 text-sm mt-1">{formik.errors.amount}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={formik.isSubmitting || isLoading}
          >
            <span>Transfer Coins</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Transfer;
