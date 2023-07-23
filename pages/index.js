import React, { useState, useRef, useEffect } from 'react';

import WritingGame from '@component/components/WritingGame';

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
        <div className='h-full w-3/12'>
          <p>{lives} 💚</p>
        </div>
      </div>
      <WritingGame
        setLives={setLives}
        lives={lives}
        ankyverseDate='sojourn 1 - wink 15 - insightia'
        userPrompt='what does your intuition say?'
        setLifeBarLength={setLifeBarLength}
      />
    </>
  );
};

export default GamePage;
