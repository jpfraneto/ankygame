import Button from '@component/components/Button';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import RunModal from '@component/components/RunModal';
import WritingGame from '@component/components/WritingGame';
import Leaderboard from '@component/components/Leaderboard';
import {
  Inter,
  Righteous,
  Rajdhani,
  Dancing_Script,
  Pacifico,
} from 'next/font/google';
import { toast } from 'react-toastify';
import StepsForGettingImage from '@component/components/StepsForGettingImage';
import { FaHeartbeat } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import NavbarComponent from '@component/components/NavbarComponent';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const dancingScript = Dancing_Script({ weight: '400', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

const GamePage = () => {
  return (
    <>
      <WritingGame userPrompt='Tell me who you are.' />

      <div className='min-h-screen bg-theblack py-8'>
        <p
          className={`${righteous.className} text-thewhite text-5xl font-bold  text-center`}
        >
          what is this?
        </p>
        <div
          className={`${righteous.className} font-bold text-thewhite text-center`}
        >
          <p className=''>Maybe it is easier to say what it is not.</p>
          <p className=''>It may look like a game.</p>
          <p className=''>But it is not.</p>
          <p className=''>It may seem like something absolutely simple.</p>
          <p className=''>But it is not.</p>
          <p className=''>It may seem easy.</p>
          <p className=''>But it is not.</p>
          <p className=''>
            The journey that you will embark on by being part of this experience
            is deep.
          </p>
          <p className=''>You are opening to your own transformation.</p>
          <p className=''>
            By developing a strong capacity for observing your thoughts.
          </p>
          <p className=''>And realizing that you are not them.</p>
          <p className=''>You are that which underlies them.</p>
          <p className=''>You are the one that is witnessing them.</p>
          <p className=''>You are not them.</p>
          <p className=''>This game is a ruthless exploration into that.</p>
          <p className=''>Into you.</p>
          <p className=''>Welcome on board.</p>
        </div>
      </div>
    </>
  );
};

export default GamePage;
