import React, { useState } from 'react';

const About = () => {
  const [chosenImageIndex, setChosenImageIndex] = useState(0);
  return (
    <div>
      {' '}
      <div className='flex flex-wrap justify-center space-x-2'>
        {[0, 1, 2, 3].map((x, i) => (
          <p
            key={i}
            className={`text-thewhite hover:cursor-pointer border flex justify-center items-center border-thewhite rounded-xl w-8 h-8 hover:opacity-70 ${
              chosenImageIndex === x
                ? 'text-xl bg-thegreenbtn'
                : 'text-md bg-theorange'
            }`}
            onClick={() => setChosenImageIndex(x)}
          >
            {x}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;
