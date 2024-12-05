import { useState, useCallback } from 'react';
import { Types, AptosClient } from 'aptos';
import { toast } from 'react-toastify';

const client = new AptosClient('https://fullnode.testnet.aptoslabs.com');
const MODULE_ADDRESS = '0x1'; // Replace with your deployed contract address
const MODULE_NAME = 'coin_transfer';

export const useAptosContract = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getBalance = useCallback(async (address: string): Promise<string> => {
    try {
      const resources = await client.getAccountResources(address);
      const coinResource = resources.find(
        (r) => r.type === `${MODULE_ADDRESS}::${MODULE_NAME}::UserBalance`
      );
      return coinResource ? coinResource.data['balance'] as string : '0';
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }, []);

  const executeTransaction = useCallback(async (
    transaction: Types.TransactionPayload,
    onSuccess?: () => void
  ) => {
    if (!window['petra']) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const pendingTransaction = await window.petra.signAndSubmitTransaction(transaction);
      await client.waitForTransaction(pendingTransaction.hash);
      
      toast.success('Transaction successful!');
      onSuccess?.();
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const transferCoins = useCallback(async (
    recipient: string,
    amount: string,
    onSuccess?: () => void
  ) => {
    const transaction = {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::transfer_coins`,
      arguments: [recipient, amount],
      type_arguments: [],
    };

    await executeTransaction(transaction, onSuccess);
  }, [executeTransaction]);

  const withdrawCoins = useCallback(async (
    amount: string,
    onSuccess?: () => void
  ) => {
    const transaction = {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::withdraw_coins`,
      arguments: [amount],
      type_arguments: [],
    };

    await executeTransaction(transaction, onSuccess);
  }, [executeTransaction]);

  return {
    isLoading,
    getBalance,
    transferCoins,
    withdrawCoins,
  };
};

export default useAptosContract;