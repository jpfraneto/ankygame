import React, { useState, useRef, useEffect } from 'react';
import StepsForGettingImage from '@component/components/StepsForGettingImage';
import { Righteous } from 'next/font/google';
import Button from './Button';
import { useRouter } from 'next/router';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const stories = [
  {
    number: 1,
    word: 'ARE',
    comicTitle: 'Survival & Physical Existence',
    comicText:
      'Anky, standing tall on a barren plain, battles shadowy figures of fear to affirm his right to exist. His earth-toned garments glow against the rocky landscape.',
    imageAlt:
      "Anky stands on a barren, rocky plain. He's surrounded by manifestations of fear, represented by shadowy, menacing figures. They're trying to overwhelm him, but Anky stands tall, his fists clenched, ready to battle for his survival and assert his right to exist. He is clothed in simple, earth-toned garments, a picture of a fierce warrior grounded in the reality of his physical existence.",
    imageUrl: '/images/the-journey/1.png',
  },
  {
    number: 2,
    word: 'YOU',
    comicTitle: 'Emotion & Sexuality',
    comicText:
      'Amid a tumultuous sea under moonlight, Anky fights sea monsters symbolizing emotional chaos, his trident striking balance within the storm.',
    imageAlt:
      'Now Anky finds himself in a tumultuous sea, fighting against towering waves and sea monsters symbolizing emotional turbulence and unbalanced desires. He battles with a trident, pushing back against the chaos around him, determined to find balance in the storm. The dramatic ocean scene, lit by a moonlit sky, paints a vivid, anime-style picture of emotional struggle and the quest for balance.',
    imageUrl: '/images/the-journey/2.png',
  },
  {
    number: 3,
    word: 'READY',
    comicTitle: 'Personal Power & Will',
    comicText:
      'Under the blazing desert sun, Anky charges at a fiery beast of self-doubt with a golden sword, reclaiming his personal power.',
    imageAlt:
      "Anky stands in a great desert, the blazing sun overhead. He's locked in combat with a massive, fiery beast symbolizing self-doubt and passivity. Anky, radiating a powerful aura and wielding a golden sword, charges towards the creature, showing his determination to reclaim his personal power and assert his will.",
    imageUrl: '/images/the-journey/3.png',
  },
  {
    number: 4,
    word: 'TO',
    comicTitle: 'Love & Compassion',
    comicText:
      'In a dark forest, Anky transforms thorny beings of hatred with a staff radiating healing light, awakening blossoming flowers with each strike.',
    imageAlt:
      'Anky finds himself in a dense, dark forest, battling thorny creatures that embody hatred and indifference. His weapon is a shining staff, emitting a warm, healing green light. Each strike against these beings transforms them, replacing the thorns with blossoming flowers, demonstrating the transformative power of love and compassion.',
    imageUrl: '/images/the-journey/4.png',
  },
  {
    number: 5,
    word: 'GO',
    comicTitle: 'Expression & Truth',
    comicText:
      'Within a stormy sky, Anky battles spectral beings of lies, his words transforming into glowing symbols of light, piercing through silence.',
    imageAlt:
      'Amid a mighty storm under a dark sky, Anky fights spectral beings that represent lies and silence. Clad in a robe of flowing blue, his words become physical manifestations, glowing symbols of light that pierce through the beings, showing the power of truth and the courage to express oneself.',
    imageUrl: '/images/the-journey/5.png',
  },
  {
    number: 6,
    word: 'DEEP',
    comicTitle: 'Intuition & Wisdom',
    comicText:
      'In a cosmic space, Anky dispels shadowy illusions of ignorance with beams of indigo light, revealing the power of intuition and wisdom.',
    imageAlt:
      'Anky is in a cosmic space-like setting, filled with stars and galaxies, battling shadowy illusions symbolizing ignorance and illusion. He sees through their disguises, using his wisdom and intuition, and dispels them with beams of indigo light, showing the triumph of insight over illusion.',
    imageUrl: '/images/the-journey/6.png',
  },
  {
    number: 7,
    word: 'WITHIN?',
    comicTitle: 'Enlightenment & Divine Connection: ',
    comicText:
      'Floating in a mystical realm, Anky unifies radiant beings of disconnection with a staff of brilliant white light, reaching enlightenment and divine unity.',
    imageAlt:
      'Anky floats in a mystical, otherworldly realm, surrounded by radiant beings that embody alienation and disconnection. Cloaked in a robe of deep violet, he combats these beings with a staff that emits a brilliant white light, representing his enlightened state and divine connection. Each strike unifies these beings with the divine, portraying the ultimate goal of unity and divine connection.',
    imageUrl: '/images/the-journey/7.png',
  },
];

const TheJourney = ({ userPrompt }) => {
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [displayedStory, setDisplayedStory] = useState(stories[0]);

  return (
    <div
      className='text-thewhite relative flex  overflow-y-scroll  w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 73px)',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/the-journey/${displayedStory.number}.png')`,
      }}
    >
      <div className='absolute w-96 h-32 bg-thewhite right-10 top-4 z-2 rounded-2xl border-theblack border-2'></div>
      <div className='flex flex-col justify-center items-center p-2 absolute w-96 h-32 bg-thewhite right-11 top-3 z-3 rounded-2xl border-theblack border-2'>
        <p
          className={`${righteous.className} text-theblack z-10 text-sm font-bold mb-0 text-center`}
        >
          {displayedStory.comicText}
        </p>
        <div className='flex text-theblack space-x-4'>
          {displayedStory.number !== 1 && (
            <span
              onClick={() => setDisplayedStory(x => stories[x.number - 1 - 1])}
              className={`${righteous.className} text-theblack z-10 text-md mt-4 font-bold hover:text-thelightblue hover:cursor-pointer  mb-0 text-center`}
            >
              Back
            </span>
          )}
          {displayedStory.number !== 7 && (
            <span
              className={`${righteous.className} text-theblack z-10 text-md mt-4 hover:cursor-pointer hover:text-thelightblue font-bold mb-0 text-center`}
              onClick={() => setDisplayedStory(x => stories[x.number + 1 - 1])}
            >
              Then
            </span>
          )}
        </div>
      </div>
      <div
        style={{ fontSize: '4rem' }}
        className={`${righteous.className} absolute bottom-4 left-1/2 -translate-x-1/2  flex justify-center  items-center `}
      >
        {displayedStory.word}
      </div>
      <div className='flex flex-col' style={{ width: '100vh/7' }}>
        <div
          className={`${righteous.className} bg-theblack bg-opacity-50 flex justify-center items-center `}
          onClick={() => setDisplayedStory(stories[0])}
          style={{
            height: 'calc(100vh / 7)',
            aspectRatio: '1/1',
            fontSize: '4rem',
            backgroundColor: `${displayedStory.number === 1 && '#EB0008'}`,
            opacity: `${displayedStory.number === 1 ? '50%' : '16%'}`,
          }}
        >
          1
        </div>{' '}
        <div
          className={`${righteous.className} bg-theblack bg-opacity-50 flex justify-center items-center `}
          onClick={() => setDisplayedStory(stories[1])}
          style={{
            height: 'calc(100vh / 7)',
            aspectRatio: '1/1',
            fontSize: '4rem',
            backgroundColor: `${displayedStory.number === 2 && '#F47704'}`,
            opacity: `${displayedStory.number === 2 ? '50%' : '16%'}`,
          }}
        >
          2
        </div>{' '}
        <div
          className={`${righteous.className} bg-theblack bg-opacity-50 flex justify-center items-center `}
          onClick={() => setDisplayedStory(stories[2])}
          style={{
            height: 'calc(100vh / 7)',
            aspectRatio: '1/1',
            fontSize: '4rem',
            backgroundColor: `${displayedStory.number === 3 && '#FBBC05'}`,
            opacity: `${displayedStory.number === 3 ? '50%' : '16%'}`,
          }}
        >
          3
        </div>{' '}
        <div
          className={`${righteous.className} bg-theblack bg-opacity-50 flex justify-center items-center `}
          onClick={() => setDisplayedStory(stories[3])}
          style={{
            height: 'calc(100vh / 7)',
            aspectRatio: '1/1',
            fontSize: '4rem',
            backgroundColor: `${displayedStory.number === 4 && '#00A24F'}`,
            opacity: `${displayedStory.number === 4 ? '50%' : '16%'}`,
          }}
        >
          4
        </div>{' '}
        <div
          className={`${righteous.className} bg-theblack bg-opacity-50 flex justify-center items-center `}
          onClick={() => setDisplayedStory(stories[4])}
          style={{
            height: 'calc(100vh / 7)',
            aspectRatio: '1/1',
            fontSize: '4rem',
            backgroundColor: `${displayedStory.number === 5 && '#02ADEE'}`,
            opacity: `${displayedStory.number === 5 ? '50%' : '16%'}`,
          }}
        >
          5
        </div>{' '}
        <div
          className={`${righteous.className} bg-theblack bg-opacity-50 flex justify-center items-center `}
          onClick={() => setDisplayedStory(stories[5])}
          style={{
            height: 'calc(100vh / 7)',
            aspectRatio: '1/1',
            fontSize: '4rem',
            backgroundColor: `${displayedStory.number === 6 && '#132A8D'}`,
            opacity: `${displayedStory.number === 6 ? '50%' : '16%'}`,
          }}
        >
          6
        </div>{' '}
        <div
          className={`${righteous.className} bg-theblack bg-opacity-50 flex justify-center items-center `}
          onClick={() => setDisplayedStory(stories[6])}
          style={{
            height: 'calc(100vh / 7)',
            aspectRatio: '1/1',
            fontSize: '4rem',
            backgroundColor: `${displayedStory.number === 7 && '#97067B'}`,
            opacity: `${displayedStory.number === 7 ? '50%' : '16%'}`,
          }}
        >
          7
        </div>{' '}
      </div>
    </div>
  );
};

export default TheJourney;
