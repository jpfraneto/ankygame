import { useState } from 'react';
import Image from 'next/image';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const AnkyverseModal = ({ isOpen, onClose, children, world }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 z-10  h-screen w-screen flex items-center justify-center bg-opacity-60 bg-theblack '>
      <div className='bg-theblack flex flex-col md:flex-row justify-start items-center border-thewhite border-2 text-thewhite h-4/5 md:h-3/5 px-4 md:max-h-96 overflow-y-scroll py-4 relative rounded-lg w-10/12 md:w-3/5  my-2 overflow-auto'>
        <div className=' h-96 md:h-full aspect-square relative overflow-hidden rounded-xl'>
          <Image src={world.image} fill />
        </div>
        <div className='flex flex-col px-9 w-full md:w-3/5 overflow-y-scroll h-full pb-2 items-start mb-auto pt-1 justify-start'>
          <h2 className={`${righteous.className} text-3xl `}>{world.name}</h2>
          <div className='text-left overflow-y-scroll h-full w-full'>
            {world.description.split('\n').map((x, i) => {
              return (
                <p key={i} className={`${righteous.className} mb-2`}>
                  {x}
                </p>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          type='button'
          className='absolute top-0 right-0 mx-4 text-red-600 hover:text-red-800 font-bold text-2xl'
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AnkyverseModal;
