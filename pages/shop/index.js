import React from 'react';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const AnkyShop = () => {
  return (
    <div className={`${righteous.className} text-thewhite`}>
      <ul>
        <li>cannabis ice cream</li>
        <li>anky genesis nft</li>
        <li>anky everyone</li>
        <li>stickers</li>
        <li>coloring books</li>
      </ul>
    </div>
  );
};

export default AnkyShop;
