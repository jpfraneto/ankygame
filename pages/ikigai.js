import React, { useState } from 'react';
import WritingGameIkigai from '@component/components/WritingGameIkigai';

const Ikigai = () => {
  const [lifeBarLength, setLifeBarLength] = useState(0);

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
      </div>
      <WritingGameIkigai
        ankyverseDate='sojourn 1 - wink 5 - voxlumis'
        setLifeBarLength={setLifeBarLength}
      />
    </>
  );
};

export default Ikigai;
