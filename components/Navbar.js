import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import { Righteous } from 'next/font/google';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
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
  const [displayTheAnkyverse, setDisplayTheAnkyverse] = useState(false);
  const [displayGallery, setDisplayGallery] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const [displayMint, setDisplayMint] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleClickLink = link => {
    if (!link) return;
    setIsOpen(false);
    router.push(link, undefined, { shallow: true });
  };

  return (
    <nav
      className={`${righteous.className} relative text-theblack font-bold top-0 w-screen justify-between overflow-x-auto bg-theblack px-4 py-2 flex flex-row items-center`}
    >
      <span
        onMouseEnter={() => setDisplayHello(true)}
        onMouseLeave={() => setDisplayHello(false)}
        onClick={() => handleClickLink('/')}
        className={`${righteous.className} hover:text-thegreenbtn text-lg sm:text-3xl hover:cursor-pointer navBtn`}
      >
        {displayHello ? 'hello :)' : 'ANKY'}
      </span>
      <div className='sm:hidden block'>
        <button className='text-thewhite mt-4' onClick={handleToggleMenu}>
          {isOpen ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
        </button>
      </div>
      <div
        className={`flex flex-col w-full sm:items-center sm:justify-end space-y-2 mt-2 pr-3 h-screen items-end bg-theblack fixed top-0 right-0 transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } sm:static sm:bg-transparent sm:h-auto sm:flex-row sm:space-y-0 sm:translate-x-0 sm:space-x-4`}
      >
        {/* <span
          onMouseEnter={() => setDisplayConnecters(true)}
          onMouseLeave={() => setDisplayConnecters(false)}
          onClick={() => handleClickLink('/ankyverse')}
          className={`${righteous.className} hover:text-thegreenbtn text-sm sm:text-xl hover:cursor-pointer navBtn`}
        >
          {displayConnecters ? '@kithkui' : 'Twitter'}
        </span> */}

        <span
          onMouseEnter={() => setDisplayTheAnkyverse(true)}
          onMouseLeave={() => setDisplayTheAnkyverse(false)}
          onClick={() => handleClickLink('/ankyverse')}
          className={`${righteous.className} hover:text-thegreenbtn text-sm sm:text-xl hover:cursor-pointer navBtn`}
        >
          {displayTheAnkyverse ? '/ankyverse' : 'Ankyverse'}
        </span>

        <span
          onMouseEnter={() => setDisplayGallery(true)}
          onMouseLeave={() => setDisplayGallery(false)}
          onClick={() => handleClickLink('/gallery')}
          className={`${righteous.className} hover:text-thegreenbtn text-sm sm:text-xl hover:cursor-pointer navBtn`}
        >
          {displayGallery ? '/gallery' : 'Gallery'}
        </span>
        <span
          onMouseEnter={() => setDisplayMint(true)}
          onMouseLeave={() => setDisplayMint(false)}
          onClick={() => handleClickLink('/shop')}
          className={`${righteous.className} hover:text-thegreenbtn text-sm sm:text-xl hover:cursor-pointer navBtn`}
        >
          {displayMint ? '/shop' : 'Shop'}
        </span>
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
