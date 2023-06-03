import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import { Righteous } from 'next/font/google';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Navbar = () => {
  const router = useRouter();
  const address = useAddress();
  const [displayConnecters, setDisplayConnecters] = useState(false);
  const [displayShop, setDisplayShop] = useState(false);
  const [displayHello, setDisplayHello] = useState(false);
  const [displayFeed, setDisplayFeed] = useState(false);
  const [displayTheJourney, setDisplayTheJourney] = useState(false);
  const [displayGallery, setDisplayGallery] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);

  return (
    <nav
      className={`${righteous.className} relative text-theblack font-bold top-0 w-screen justify-between overflow-x-scroll bg-theblack flex items-center px-16 py-4`}
    >
      <span
        onMouseEnter={() => setDisplayHello(true)}
        onMouseLeave={() => setDisplayHello(false)}
        onClick={() => router.push('/', undefined, { shallow: true })}
        className={`${righteous.className} hover:text-thegreenbtn  text-3xl  hover:cursor-pointer navBtn`}
      >
        {displayHello ? 'hello :)' : 'ANKY'}
      </span>
      <div className='flex items-center space-x-4 w-fit px-2'>
        <span
          onMouseEnter={() => setDisplayConnecters(true)}
          onMouseLeave={() => setDisplayConnecters(false)}
          className={`${righteous.className} hover:text-thegreenbtn  text-xl hover:cursor-pointer navBtn`}
        >
          {displayConnecters ? '@kithkui' : 'Twitter'}
        </span>
        <span
          onMouseEnter={() => setDisplayFeed(true)}
          onMouseLeave={() => setDisplayFeed(false)}
          onClick={() => router.push('/feed', undefined, { shallow: true })}
          className={`${righteous.className} hover:text-thegreenbtn  text-xl hover:cursor-pointer navBtn`}
        >
          {displayFeed ? '/feed' : 'Feed'}
        </span>
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

        <span
          onMouseEnter={() => setDisplayGallery(true)}
          onMouseLeave={() => setDisplayGallery(false)}
          onClick={() => router.push('/gallery', undefined, { shallow: true })}
          className={`${righteous.className} hover:text-thegreenbtn  text-xl  hover:cursor-pointer navBtn`}
        >
          {displayGallery ? '/gallery' : 'Gallery'}
        </span>
        {address && (
          <span
            onMouseEnter={() => setDisplayProfile(true)}
            onMouseLeave={() => setDisplayProfile(false)}
            onClick={() => router.push('/me', undefined, { shallow: true })}
            className={`${righteous.className} hover:text-thegreenbtn  text-xl  hover:cursor-pointer navBtn`}
          >
            {displayProfile ? '/me' : 'Profile'}
          </span>
        )}

        {/*
        <span
          onMouseEnter={() => setDisplayShop(true)}
          onMouseLeave={() => setDisplayShop(false)}
          onClick={() => router.push('/shop', undefined, { shallow: true })}
          className={`${righteous.className} hover:text-thegreenbtn hover:cursor-pointer navBtn`}
        >
          {displayShop ? '/shop' : 'Shop'}
        </span> */}

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
