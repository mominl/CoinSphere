import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';

const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      type: 'Deposit',
      amount: '1,000 USDC',
      status: 'Completed',
      date: '2024-02-20',
      from: '0x1234...5678',
      to: '0x8765...4321',
    },
    // Add more transaction data as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4">Type</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">From</th>
                <th className="pb-4">To</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-700"
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      {tx.type === 'Deposit' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-red-400" />
                      )}
                      <span>{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4">{tx.amount}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-sm rounded-full bg-green-500/20 text-green-400">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4">{tx.date}</td>
                  <td className="py-4">{tx.from}</td>
                  <td className="py-4">{tx.to}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;