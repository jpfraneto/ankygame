import React, { useState, useRef, useEffect } from 'react';

import WritingGame from '@component/components/WritingGame';
import Head from 'next/head';

const GamePage = () => {
  const [lifeBarLength, setLifeBarLength] = useState(100);
  const [lives, setLives] = useState(3);

  return (
    <>
      <div className='text-thewhite w-full h-8 flex justify-between items-center px-2'>
        <div className='h-full w-9/12'>
          <div
            className='h-full'
            style={{
              width: `${lifeBarLength}%`,
              backgroundColor: lifeBarLength > 30 ? 'green' : 'red',
            }}
          ></div>
        </div>
        <div className='h-full text-center flex items-center justify-center w-3/12'>
          <span className='text-gray-800'>anky is you</span>
        </div>
      </div>
      <WritingGame
        setLives={setLives}
        lives={lives}
        ankyverseDate='sojourn 1 - wink 28 - poiesis'
        userPrompt='tell me who you are'
        setLifeBarLength={setLifeBarLength}
      />
    </>
  );
};

export default GamePage;
