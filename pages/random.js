// Random.js
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Random = ({ random }) => {
  return (
    <div className={`${righteous.className} text-thewhite w-8/12 mx-auto`}>
      <h1 className='text-3xl mb-3'>{random.characterName}</h1>
      <div className='flex h-full w-full'>
        <div className='flex flex-col h-full'>
          <div className='relative p-4 aspect-square  h-96'>
            <Image src={random.chosenImageUrl} fill />
          </div>
          <div className='my-4 text-left'>
            {Object.entries(random.traits).map(([key, value]) => (
              <p key={key}>
                <span className='bg-thegreen p-2 rounded m-2'>{key}</span>:{' '}
                {value}
              </p>
            ))}
          </div>
        </div>

        <div className='p-4'>
          {random.characterBackstory.split('\n').map(x => (
            <p>{x}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Random;

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/getrandomcharacter');
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
