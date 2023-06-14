import React, { useState } from 'react';
import { Righteous } from 'next/font/google';
import { worlds } from '@component/lib/newCharacterGenerator';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const AnkyverseKingdoms = () => {
  const [chosenWorld, setChosenWorld] = useState(null);
  return (
    <div className='flex flex-row w-full pt-8 bg-thegreen'>
      <div
        className=' flex flex-col px-2'
        style={{ height: 'calc(100vh  - 80px - 80px)', width: '100vh/8' }}
      >
        {worlds.map((world, index) => {
          return (
            <div
              key={index}
              onClick={() => setChosenWorld(world)}
              className={`${righteous.className} flex justify-center items-center hover:text-thered hover:cursor-pointer `}
              style={{
                height: 'calc(100vh / 8)',
                fontSize: '2rem',
              }}
            >
              {world.name}
            </div>
          );
        })}
      </div>
      <div className={`${righteous.className} p-4 bg-theblue w-full `}>
        {chosenWorld ? (
          <div>
            <h2 className='text-3xl mb-3'>
              {chosenWorld.name} - {chosenWorld.description}
            </h2>
            <div>
              <h2>Cities</h2>
              <div>
                {chosenWorld.cities.map((x, i) => (
                  <div key={i}>
                    <h3>
                      {x.cityName} - {x.associatedLandmark} - {x.mainActivity}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <div>
              <h2>Landmarks</h2>
              <ul>
                {chosenWorld.landmarks.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
            <br />
            <div>
              <h2>Celebrations</h2>
              <ul>
                {chosenWorld.celebrations.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
            <br />
            <div>
              <h2>People Characteristics</h2>
              <p>{chosenWorld.characteristicsOfPeople}</p>
            </div>
          </div>
        ) : (
          <div className={`${righteous.className} text-thewhite`}>
            <h3>Welcome to the Ankyverse</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnkyverseKingdoms;
