import '@component/styles/globals.css';
import Head from 'next/head';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { Ethereum, Polygon, Sepolia } from '@thirdweb-dev/chains';
import Navbar from '@component/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>anky 🐒</title>
        <meta name='description' content='👽' key='desc' />
        <meta property='og:description' content='🤖' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Transform your life by vomiting all the words that you always wanted to say.'
        />
      </Head>
      <ThirdwebProvider
        activeChain={Sepolia}
        supportedChains={[Ethereum, Sepolia]}
        supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      >
        <Navbar />
        <div className=''>
          <Component {...pageProps} />
        </div>
      </ThirdwebProvider>
    </>
  );
}
