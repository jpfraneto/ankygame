import React, { useState, useRef, useEffect } from 'react';
import { Righteous } from 'next/font/google';
import Button from './Button';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { worlds } from '@component/lib/newCharacterGenerator';
import { MdNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import AnkyverseKingdoms from './Ankyverse/kingdoms';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const AnkyverseComponent = ({}) => {
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [displayedStory, setDisplayedStory] = useState(null);
  const [chosenDisplay, setChosenDisplay] = useState('story');

  return (
    <div
      className='text-thewhite relative flex  overflow-y-scroll  w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 80px)',
      }}
    >
      <div
        className={`${righteous.className} absolute px-4 items-center justify-between	 top-0 w-full bg-thered h-8 flex flex-row`}
      >
        <div>Story</div>
        <div>Kingdoms</div>
        <div>Characters</div>
        <div>Masks</div>
      </div>

      <AnkyverseKingdoms />
    </div>
  );
};

export default AnkyverseComponent;
