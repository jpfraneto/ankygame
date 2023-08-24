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
        ankyverseDate='sojourn 1 - wink 15 - claridium'
        userPrompt='How do you cultivate a connection with the universe or a higher power?'
        setLifeBarLength={setLifeBarLength}
      />
    </>
  );
};

export default GamePage;
