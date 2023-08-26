import React, { useState, useEffect, useRef } from 'react';
import '@component/styles/globals.css';
import Head from 'next/head';
import { Righteous } from 'next/font/google';
import { PrivyProvider } from '@privy-io/react-auth';
import { ethers, BigNumber } from 'ethers';
import { Ethereum, Goerli, Sepolia } from '@thirdweb-dev/chains';
import Navbar from '@component/components/Navbar';

const righteous = Righteous({ subsets: ['latin'], weight: ['400'] });

const handleLogin = user => {
  console.log(`User ${user.id} logged in!`);
};

export default function App({ Component, pageProps }) {
  const [password, setPassword] = useState('');
  const [musicOn, setMusicOn] = useState(null);
  const [musicVolume, setMusicVolume] = useState(1.0);
  const [audioFiles, setAudioFiles] = useState([]);
  const [loadButtons, setLoadButtons] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [musicActivated, setMusicActivated] = useState(false);
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  return (
    <>
      <Head>
        <title>anky 🐒</title>
        <meta name='description' content='👽' key='desc' />
        <meta
          httpEquiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
        <meta property='og:description' content='🤖' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Transform your life by vomiting all the words that you always wanted to say.'
        />
      </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
        onSuccess={handleLogin}
        config={{
          loginMethods: ['email'],
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: '',
          },
        }}
      >
        <div className={`${righteous.className} overflow-x-hidden`}>
          <Component {...pageProps} setLoadButtons={setLoadButtons} />
        </div>
      </PrivyProvider>
    </>
  );
}
