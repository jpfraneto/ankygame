import React from 'react';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const UserGallery = () => {
  return (
    <div
      className='text-thewhite relative h-screen flex flex-col items-center overflow-y-scroll py-16 justify-center w-full bg-cover bg-center'
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
        users gallery.
      </p>
    </div>
  );
};

export default UserGallery;
