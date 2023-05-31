import Link from 'next/link';
import React from 'react';
import Button from './Button';
import { Righteous } from 'next/font/google';
import { ConnectWallet } from '@thirdweb-dev/react';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Navbar = () => {
  return (
    <nav
      className={`${righteous.className} text-theblack font-bold absolute top-0 w-screen h-16 justify-between bg-transparent flex items-center px-16`}
    >
      <Link href='/'>
        <span className={`${righteous.className} hover:text-thepurple navBtn`}>
          ANKY
        </span>
      </Link>
      <div className='flex items-center space-x-4 w-fit px-2'>
        <Link href='/the-journey'>
          <span className={`${righteous.className} hover:text-thegreen navBtn`}>
            The Journey
          </span>
        </Link>
        {/* <Link href='/world'>
          <span className={`${righteous.className} hover:text-thegreen navBtn`}>
            World
          </span>
        </Link> */}
        <Link href='/mint'>
          <span
            className={`${righteous.className} hover:text-thegreen  navBtn`}
          >
            Gallery
          </span>
        </Link>

        <Link href='/games'>
          <span className={`${righteous.className} hover:text-thegreen navBtn`}>
            Buy
          </span>
        </Link>
        <Link href='/games'>
          <span className={`${righteous.className} hover:text-thegreen navBtn`}>
            Twitter
          </span>
        </Link>
        <ConnectWallet
          auth={{
            loginOptional: false,
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
