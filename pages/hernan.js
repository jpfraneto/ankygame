import React from 'react';
import WritingGame from '@component/components/WritingGame';
import Image from 'next/image';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const hernan = () => {
  return (
    <div
      className='text-thewhite relative  flex flex-col items-center overflow-y-scroll py-16 justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
      }}
    >
      <p className={`${righteous.className} text-2xl text-thewhite mb-3`}>
        remember the future
      </p>
      <div className='border border-thewhite rounded-3xl overflow-hidden'>
        {' '}
        <Image src='/images/anky.png' width={444} height={444} alt='anky' />
      </div>
      <button
        className={`${righteous.className} hover:bg-theblack hover:text-thewhite hover:border-thewhite border rounded-xl text-2xl bg-thewhite px-4 py-2 text-theblack mt-3`}
      >
        Take me in.
      </button>
    </div>
  );
};

export default hernan;
