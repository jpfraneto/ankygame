// Random.js
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Random = ({ random }) => {
  return (
    <div
      className={`${righteous.className} text-thewhite md:w-8/12 w-full mx-auto`}
    >
      <h1 className='text-3xl mb-3'>{random.characterName}</h1>
      <div className='flex h-full w-full flex-col md:flex-row'>
        <div className='flex flex-col h-full'>
          <div className='relative p-4 aspect-square  h-96'>
            <Image src={random.chosenImageUrl} fill />
          </div>
          <div className='my-4 px-2 text-left'>
            {Object.entries(random.traits).map(([key, value]) => (
              <p key={key}>
                <span className='bg-thegreen p-2 rounded m-2'>{key}</span>:{' '}
                {value}
              </p>
            ))}
          </div>
        </div>

        <div className='p-4'>
          {random.characterBackstory.split('\n').map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Random;

export async function getServerSideProps() {
  const res = await fetch('https://www.anky.lat/api/getrandomcharacter');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  console.log('the data is: ', data);

  return {
    props: {
      random: data.randomCharacter,
    },
  };
}
