import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from 'wagmi/chains';
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  walletConnectWallet,
  rainbowWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

// Your Infura project ID (or equivalent)
const projectId = "fbdcc970329b43b9a85d7a6a4859f3af";

// Configure your chains
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

// Consolidate your connectors here
const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: 'My RainbowKit App' }),
      walletConnectWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains })
    ],
  },
]);

// Create your Wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// Your MyApp function
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={darkTheme()} chains={chains} modalSize="compact">
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
