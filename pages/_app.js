import React, { useState } from 'react';
import '@component/styles/globals.css';
import Head from 'next/head';
import { Righteous } from 'next/font/google';

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { Ethereum, Goerli, Sepolia } from '@thirdweb-dev/chains';
import Navbar from '@component/components/Navbar';

const righteous = Righteous({ subsets: ['latin'], weight: ['400'] });

export default function App({ Component, pageProps }) {
  const [password, setPassword] = useState('');
  const correctPassword = 'hf0';
  const isAuthorized = password === correctPassword;

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
      {isAuthorized ? (
        <ThirdwebProvider
          activeChain={Ethereum}
          supportedChains={[Ethereum]}
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ]}
        >
          <div className={`${righteous.className} overflow-x-hidden`}>
            <Navbar />
            <Component {...pageProps} />
          </div>
        </ThirdwebProvider>
      ) : (
        <div
          className={`${righteous.className} flex flex-col items-center justify-center h-screen overflow-x-hidden`}
        >
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
          />
        </div>
      )}
    </>
  );
}
