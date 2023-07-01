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
      <WritingGame userPrompt='Qué es la muerte?' />

      <div className='min-h-screen bg-theblack py-8'>
        <p
          className={`${righteous.className} text-thewhite text-5xl font-bold  text-center`}
        >
          ¿Qué es esto?
        </p>
        <div
          className={`${righteous.className} font-bold text-thewhite text-center`}
        >
          <p className=''>Quizás es más fácil decir lo que no es.</p>
          <p className=''>Puede parecer un juego.</p>
          <p className=''>Pero no lo es.</p>
          <p className=''>Puede parecer algo absolutamente simple.</p>
          <p className=''>Pero no lo es.</p>
          <p className=''>Puede parecer fácil.</p>
          <p className=''>Pero no lo es.</p>
          <p className=''>
            El viaje en el que te embarcarás al ser parte de esta experiencia es
            profundo.
          </p>
          <p className=''>Te estás abriendo a tu propia transformación.</p>
          <p className=''>
            Al desarrollar una fuerte capacidad para observar tus pensamientos.
          </p>
          <p className=''>Y darte cuenta de que tú no eres ellos.</p>
          <p className=''>Eres lo que subyace en ellos.</p>
          <p className=''>Eres el que los está presenciando.</p>
          <p className=''>Tú no eres ellos.</p>
          <p className=''>Este juego es una exploración despiadada de eso.</p>
          <p className=''>De ti.</p>
          <p className=''>Bienvenido a bordo.</p>
        </div>
      </div>
    </>
  );
};

export default GamePage;
