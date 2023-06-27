import AnkyverseComponent from '@component/components/AnkyverseComponent';
import React, { useState } from 'react';
import { Righteous } from 'next/font/google';
import { worlds } from '@component/lib/newCharacterGenerator';
import Image from 'next/image';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Ankyverse = () => {
  const [chosenWorld, setChosenWorld] = useState(null);

  return (
    <div
      className='text-thewhite relative flex md:flex-row flex-col overflow-y-scroll w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
      }}
    >
      <div className='h-fit md:h-full w-screen md:w-3/12 overflow-y-scroll  px-9 pt-6 bg-theblack'>
        <h2 className={`${righteous.className}  text-3xl mb-4 `}>Ankyverse</h2>
        <div className='h-fit'>
          {worlds.map((world, index) => {
            return (
              <div
                key={index}
                onClick={() => setChosenWorld(world)}
                className={`${righteous.className} flex items-center hover:text-thered hover:cursor-pointer `}
              >
                {world.name}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`${righteous.className} h-fit pb-8 md:h-full w-screen md:max-w-9/12 overflow-y-scroll flex text-thewhite flex-col`}
      >
        <div className='px-6 py-6 flex flex-wrap h-full '>
          {chosenWorld ? (
            <div className='flex h-full'>
              <div className='relative h-96 aspect-square'>
                <Image
                  src={`/images/kingdoms/${chosenWorld.name}.png`}
                  fill
                  alt={chosenWorld.name}
                />
              </div>
              <div className='text-left'>
                <h2 className='text-3xl mb-1'>
                  {chosenWorld.name.toUpperCase()}
                </h2>
                <h2>{chosenWorld.description}</h2>
                <hr className='mb-2' />
                <div>
                  <h2 className='text-2xl text-theredbtn'>Cities</h2>
                  <div>
                    {chosenWorld.cities.map((x, i) => (
                      <div key={i}>
                        <h3>
                          {x.cityName} - {x.associatedLandmark} -{' '}
                          {x.mainActivity}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
                <br />
                <div>
                  <h2 className='text-2xl text-theredbtn'>Landmarks</h2>
                  <ul>
                    {chosenWorld.landmarks.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <br />
                <div>
                  <h2 className='text-2xl text-theredbtn'>Celebrations</h2>
                  <ul>
                    {chosenWorld.celebrations.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
                <br />
                <div>
                  <h2 className='text-2xl text-theredbtn'>
                    People Characteristics
                  </h2>
                  <p>{chosenWorld.characteristicsOfPeople}</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`${righteous.className} text-thewhite w-full h-full relative`}
            >
              <Image src='/images/ankyverse.jpeg' alt='Ankyverse' fill />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ankyverse;
