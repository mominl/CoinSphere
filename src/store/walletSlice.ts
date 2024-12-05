import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
  network: 'mainnet' | 'testnet';
}

const initialState: WalletState = {
  address: null,
  balance: '0',
  isConnected: false,
  network: 'testnet',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<{ address: string }>) => {
      state.address = action.payload.address;
      state.isConnected = true;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    setNetwork: (state, action: PayloadAction<'mainnet' | 'testnet'>) => {
      state.network = action.payload;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.balance = '0';
      state.isConnected = false;
    },
  },
});

export const { setWallet, setBalance, setNetwork, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;