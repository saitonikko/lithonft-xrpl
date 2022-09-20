import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './assets/styles/styles.scss';
import Layout from './layouts';
import Home from './pages/Home';

import {
  getDefaultWallets,
  getWalletConnectConnector,
  RainbowKitProvider,
  connectorsForWallets,
  wallet
} from '@rainbow-me/rainbowkit';
import { configureChains, chain, createClient, WagmiConfig } from 'wagmi';
// import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import "@rainbow-me/rainbowkit/styles.css";

import { ToastContainer } from 'react-toastify';

const bscChain = {
  mainnet: {
    id: 56,
    name: 'BSC Mainnet',
    network: 'bsc_mainnet',
    iconUrl: 'https://umbria.network/assets/images/icon/bsclogo.png?v1',
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://bsc-dataseed1.binance.org',
    },
    blockExplorers: {
      default: { name: 'BSCScan', url: 'https://bscscan.com/' },
    },
    testnet: false,
  },
  testnet: {
    id: 97,
    name: 'BSC Testnet',
    network: 'bsc_testnet',
    iconUrl: 'https://umbria.network/assets/images/icon/bsclogo.png?v1',
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    },
    blockExplorers: {
      default: { name: 'BSCScan', url: 'https://testnet.bscscan.com/' },
    },
    testnet: false,
  }
};

const { chains, provider } = configureChains(
  // [
  //   chain.ropsten,
  //   chain.mainnet,
  // ],
  // [publicProvider()]
  [
    bscChain.mainnet,
    bscChain.testnet,
    // chain.mainnet
  ],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   chains,
// });

// const xumm = ({ chains }) => ({
//   id: 'xumm',
//   name: 'Xumm Wallet',
//   iconUrl: './img/xumm.png',
//   iconBackground: '#0029ff',
//   downloadUrls: {
//     android: 'https://play.google.com/store/apps/details?id=com.xrpllabs.xumm',
//     ios: 'https://apps.apple.com/us/app/xumm/id1492302343',
//     qrCode: 'https://xumm.app/',
//   },
//   createConnector: () => {
//     const connector = getWalletConnectConnector({ chains });

//     return {
//       connector,
//       mobile: {
//         getUri: async () =>
//         // (await connector.getProvider()).connector.uri,
//         {
//           const res = await fetch("http://localhost:8080", {method: "POST"});
//           const data = await res.json();
//           return data.url;
//         },
//       },
//       qrCode: {
//         getUri: async () =>
//         // (await connector.getProvider()).connector.uri,
//         {
//           const res = await fetch("http://localhost:8080", {method: "POST"});
//           const data = await res.json();
//           return data.url;
//         },
//         instructions: {
//           learnMoreUrl: 'https://xumm.app/',
//           steps: [
//             {
//               description:
//                 'We recommend putting My Wallet on your home screen for faster access to your wallet.',
//               step: 'install',
//               title: 'Open the My Wallet app',
//             },
//             {
//               description:
//                 'You can easily backup your wallet using the cloud backup feature.',
//               step: 'create',
//               title: 'Create or Import a Wallet',
//             },
//             {
//               description:
//                 'After you scan, a connection prompt will appear for you to connect your wallet.',
//               step: 'scan',
//               title: 'Tap the scan button',
//             },
//           ],
//         },
//       },
//     };
//   },
// });

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.metaMask({ chains }),
      wallet.trust({ chains }),
      wallet.coinbase({ chains }),
      wallet.walletConnect({ chains }),
      // xumm({ chains })
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  const [page, setPage] = useState(0);
  const [network, setNetwork] = useState(0);
  const [account, setAccount] = useState(null);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout page={page} network={network} setNetwork={setNetwork} account={account} setAccount={setAccount}>
          <Routes>
            <Route index element={<Home setPage={setPage} network={network} setNetwork={setNetwork} account={account} />} />
          </Routes>
        </Layout>
        <ToastContainer autoClose={2000} />
      </RainbowKitProvider>
    </WagmiConfig>



  );
}

export default App;
