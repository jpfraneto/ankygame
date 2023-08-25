import React, { useState, useRef, useEffect } from 'react';

import WritingGame from '@component/components/WritingGame';
import Head from 'next/head';

const GamePage = ({ setLoadButtons, loadButtons }) => {
  const [lifeBarLength, setLifeBarLength] = useState(0);
  const [lives, setLives] = useState(3);

  return (
    <>
      <div className='text-thewhite w-full h-8 flex justify-between items-center px-2'>
        <div className='h-full w-full'>
          <div
            className='h-full opacity-50'
            style={{
              width: `${lifeBarLength}%`,
              backgroundColor: lifeBarLength > 30 ? 'green' : 'red',
            }}
          ></div>
        </div>
      </div>
      <WritingGame
        setLoadButtons={setLoadButtons}
        setLives={setLives}
        lives={lives}
        ankyverseDate='sojourn 1 - wink 16 - poiesis'
        userPrompt='How has your capacity for expressing yourself creatively evolved over time?'
        setLifeBarLength={setLifeBarLength}
      />
    </>
  );
};

export default GamePage;
