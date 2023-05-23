import React from 'react';

const Spinner = () => {
  return (
    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-thedarkred to-thedarkgreen animate-spin'>
      <div className='h-5 w-5 rounded-full bg-black'></div>
    </div>
  );
};

export default Spinner;
