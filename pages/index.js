import React, { useState, useRef, useEffect } from 'react';

import WritingGame from '@component/components/WritingGame';
import Head from 'next/head';

const GamePage = ({ setLoadButtons, loadButtons }) => {
  const [lifeBarLength, setLifeBarLength] = useState(0);
  const [lives, setLives] = useState(3);

  return (
    <>
      <div className='text-thewhite w-full h-8 flex justify-between items-center px-2'>
        <div className='h-full w-9/12'>
          <div
            className='h-full opacity-50'
            style={{
              width: `${lifeBarLength}%`,
              backgroundColor: lifeBarLength > 30 ? 'green' : 'red',
            }}
          ></div>
        </div>
        <div className='h-full text-center flex items-center justify-center w-3/12'>
          <span
            className={`${
              loadButtons ? 'fade-in flex' : 'hidden'
            } text-gray-800`}
          >
            anky eres tu
          </span>
        </div>
      </div>
      <WritingGame
        setLoadButtons={setLoadButtons}
        setLives={setLives}
        lives={lives}
        ankyverseDate='sojourn 1 - wink 9 - primordia'
        userPrompt='How has your approach to survival and safety changed since your early years?'
        setLifeBarLength={setLifeBarLength}
      />
    </>
  );
};

export default GamePage;
