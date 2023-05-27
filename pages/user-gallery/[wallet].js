import React from 'react';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from '@component/components/Button';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const kithkui = [
  {
    imageUrl: '/jpankys/ankyunfolding.png',
    timeSpent: 44,
    content:
      'A disheveled, night owl with a hint of rebelliousness, lost in decision-making. Wants to set the mood with music but still has control over the situation.',
  },
  {
    imageUrl: '/jpankys/ankystressed.png',
    timeSpent: 88,
    content:
      'The profile picture of a cartoon of a frazzled person with messy hair and tired eyes, desperately trying to make connections in a jumbled mess of wires and data. The stress is visible on their face as they reset the database and make new associations between the characters and their actions.',
  },
  {
    imageUrl: '/jpankys/ankycrazy.png',
    timeSpent: 150,
    content:
      'An unkempt, frazzled individual with darting, paranoid eyes, whispers to themselves while scribbling frantically on a notebook. Nervous energy dominates their appearance.',
  },
];

const UserGallery = () => {
  const router = useRouter();
  return (
    <div
      className='text-thewhite relative h-screen  overflow-y-scroll py-16  w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
      }}
    >
      <p
        className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
      >
        user gallery: <span className='text-2xl'>{router.query.wallet}</span>
      </p>
      <div className='mb-4 flex flex-row justify-center flex-nowrap space-x-2'>
        {kithkui.map((x, i) => {
          return <GalleryCard element={x} />;
        })}
      </div>
      <div className='flex justify-center '>
        <Button buttonAction={() => router.push('/')} buttonText='Go back' />
      </div>
    </div>
  );
};

export default UserGallery;

const GalleryCard = ({ element }) => {
  return (
    <div className='text-center p-4 border border-thewhite rounded-lg bg-thewhite bg-opacity-30'>
      <Image
        src={element.imageUrl}
        width={300}
        height={300}
        alt='Image for this run'
      />

      <p className='mb-0 text-2xl'>{element.timeSpent} seconds</p>
      <div className='flex flex-row space-x-2 justify-center'>
        <button onClick={() => alert('read this')}>Read</button>
        <button onClick={() => alert('Open NFT on Opensea')}>Opensea</button>
      </div>
    </div>
  );
};
