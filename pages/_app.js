import React, { useState, useEffect } from 'react';
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
  const [musicOn, setMusicOn] = useState(null);
  const [musicVolume, setMusicVolume] = useState(1.0);
  const [audioFiles, setAudioFiles] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [musicActivated, setMusicActivated] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  const correctPassword = 'hf0';

  useEffect(() => {
    if (musicOn) {
      const audio = new Audio('/assets/music/1.mp3');
      audio.play();
      const nextAudioFiles = [audio];
      for (let i = 2; i <= 5; i++) {
        const nextAudio = new Audio(`/assets/music/${i}.mp3`);
        nextAudioFiles.push(nextAudio);
        nextAudioFiles[i - 2].addEventListener('ended', function () {
          nextAudioFiles[i - 1].play();
        });
      }
      setAudioFiles(nextAudioFiles);
    } else if (audioFiles.length) {
      audioFiles.forEach(audio => audio.pause());
      setAudioFiles([]);
    }
  }, [musicOn]);

  const checkPassword = () => {
    if (password === correctPassword) {
      setIsAuthorized(true);
    }
    setPwMessage('Wrong Password');
  };

  const setMusicPlay = e => {
    setMusicOn(e.target.value);
  };

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
          className={`${righteous.className} flex items-center flex-col justify-center h-screen overflow-x-hidden`}
        >
          <div className=''>
            {' '}
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => {
                setPwMessage('');
                setPassword(e.target.value);
              }}
              className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
            />
            <button
              onClick={checkPassword}
              className='bg-thewhite px-4 py-2 ml-3 rounded text-theblack hover:bg-theblack hover:text-thewhite hover:border-thewhite border'
            >
              Enter
            </button>
          </div>
          {pwMessage && <p className='text-theredbtn'>{pwMessage}</p>}
          <div className='mt-4 flex items-center'>
            <small className='text-thewhite mr-4'>
              Do you want to go through this journey with music? (Highly
              recommended)
            </small>
            <input
              type='checkbox'
              onChange={setMusicPlay}
              className='h-4 w-4 hover:cursor-pointer glowing'
            />
          </div>
        </div>
      )}
    </>
  );
}
