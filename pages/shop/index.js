import React from 'react';
import { Righteous } from 'next/font/google';
import Shop from '@component/components/Shop';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const AnkyShop = () => {
  return <Shop />;
};

export default AnkyShop;
