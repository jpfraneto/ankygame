import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import { Righteous } from 'next/font/google';
import { ConnectWallet } from '@thirdweb-dev/react';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Navbar = () => {
  const router = useRouter();
  const [displayConnecters, setDisplayConnecters] = useState(false);
  const [displayShop, setDisplayShop] = useState(false);
  const [displayHello, setDisplayHello] = useState(false);
  const [displayTheJourney, setDisplayTheJourney] = useState(false);
  const [displayGallery, setDisplayGallery] = useState(false);
  return (
    <nav
      className={`${righteous.className} relative text-theblack font-bold top-0 w-screen justify-between bg-theblack flex items-center px-16 py-4`}
    >
      <span
        onMouseEnter={() => setDisplayHello(true)}
        onMouseLeave={() => setDisplayHello(false)}
        onClick={() => router.push('/', undefined, { shallow: true })}
        className={`${righteous.className} hover:text-thegreenbtn  text-2xl  hover:cursor-pointer navBtn`}
      >
        {displayHello ? 'hello :)' : 'ANKY'}
      </span>
      <div className='flex items-center space-x-4 w-fit px-2'>
        <span
          onMouseEnter={() => setDisplayTheJourney(true)}
          onMouseLeave={() => setDisplayTheJourney(false)}
          onClick={() =>
            router.push('/the-journey', undefined, { shallow: true })
          }
          className={`${righteous.className} hover:text-thegreenbtn  text-xl  hover:cursor-pointer navBtn`}
        >
          {displayTheJourney ? '/the-journey' : 'The Journey'}
        </span>
        {/* <span
          onMouseEnter={() => setDisplayGallery(true)}
          onMouseLeave={() => setDisplayGallery(false)}
          onClick={() => router.push('/gallery', undefined, { shallow: true })}
          className={`${righteous.className} hover:text-thegreenbtn hover:cursor-pointer navBtn`}
        >
          {displayGallery ? '/gallery' : 'Gallery'}
        </span>

        <span
          onMouseEnter={() => setDisplayShop(true)}
          onMouseLeave={() => setDisplayShop(false)}
          onClick={() => router.push('/shop', undefined, { shallow: true })}
          className={`${righteous.className} hover:text-thegreenbtn hover:cursor-pointer navBtn`}
        >
          {displayShop ? '/shop' : 'Shop'}
        </span> */}

        <span
          onMouseEnter={() => setDisplayConnecters(true)}
          onMouseLeave={() => setDisplayConnecters(false)}
          className={`${righteous.className} hover:text-thegreenbtn  text-xl hover:cursor-pointer navBtn`}
        >
          {displayConnecters ? '@kithkui' : 'Twitter'}
        </span>

        <span>
          <ConnectWallet
            auth={{
              loginOptional: false,
            }}
          />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
