import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './assets/styles/styles.scss';
import Layout from './layouts';
import Home from './pages/Home';
import Second from './pages/Second';
import Third from './pages/Third';

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, chain, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import "@rainbow-me/rainbowkit/styles.css";

import { ToastContainer } from 'react-toastify';

// const bscChain = {
//   id: 97,
//   name: 'BSC Testnet',
//   network: 'bsc_testnet',
//   iconUrl: 'https://umbria.network/assets/images/icon/bsclogo.png?v1',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'BNB',
//     symbol: 'BNB',
//   },
//   rpcUrls: {
//     default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
//   },
//   blockExplorers: {
//     default: { name: 'BSCScan', url: 'https://testnet.bscscan.com/' },
//   },
//   testnet: false,
// };

const { chains, provider } = configureChains(
  [
    chain.ropsten,
    chain.mainnet,
  ],
  [publicProvider()]
  // [
  //   bscChain,
  //   chain.mainnet
  // ],
  // [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  const [page, setPage] = useState(0);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout page={page}>
          <Routes>
            <Route index element={<Home setPage={setPage} />} />
          </Routes>
        </Layout>
        <ToastContainer autoClose={2000} />
      </RainbowKitProvider>
    </WagmiConfig>



  );
}

export default App;
