import AnkyverseModal from '@component/components/AnkyverseModal';
import React, { useState } from 'react';
import { Righteous } from 'next/font/google';
import Image from 'next/image';
import { worlds } from '@component/lib/ankyGenerationMessagesForTraits.js';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Ankyverse = () => {
  const [chosenWorld, setChosenWorld] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const chooseWorldForDisplay = i => {
    setChosenWorld(worlds[i]);
    console.log(worlds[i]);
    setModalOpen(true);
  };
  return (
    <div
      className='text-thewhite relative flex md:flex-row flex-col overflow-y-scroll w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
      }}
    >
      <div className='h-fit md:h-full w-screen md:w-96 overflow-y-scroll px-9 pt-6'>
        <h2 className={`${righteous.className}  text-3xl  `}>Ankyverse</h2>
        <p className={`${righteous.className} mt-7 text-md `}>
          This is the world on which this story unfolds.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Resembling the chakra system, each one of these kingdoms is a
          energetical representation of the energies that flow through us,
          humans.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Each one, a place on which you will come to work in a particular
          aspect of your being.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Welcome to the Ankyverse.
        </p>
      </div>
      <div className='h-fit pb-8 md:h-full overflow-y-scroll w-full flex bg-theblack text-thewhite md:flex-row flex-col'>
        <div className='px-6 py-6 flex flex-wrap h-full justify-center '>
          {worlds.map((x, i) => {
            return (
              <div
                key={i}
                onClick={() => chooseWorldForDisplay(i)}
                className='flex flex-col justify-center items-center'
              >
                <div
                  key={i}
                  style={{ width: '240px', height: '240px' }}
                  className='m-2 relative rounded-xl hover:border-thewhite hover:border hover:cursor-pointer overflow-hidden shadow-lg'
                >
                  <Image fill src={x.image} />
                </div>
                <small className={`${righteous.className} text-lg mb-0`}>
                  {x.name}
                </small>
              </div>
            );
          })}
        </div>
      </div>
      <AnkyverseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        world={chosenWorld}
      ></AnkyverseModal>
    </div>
  );
};

export default Ankyverse;
