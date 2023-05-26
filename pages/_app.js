import '@component/styles/globals.css';
import Head from 'next/head';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { Ethereum, Polygon, Sepolia } from '@thirdweb-dev/chains';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>anky 🐒</title>
        <meta name='description' content='👽' key='desc' />
        <meta property='og:description' content='🤖' />
      </Head>
      <ThirdwebProvider
        activeChain={Sepolia}
        supportedChains={[Ethereum, Sepolia]}
        supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}
