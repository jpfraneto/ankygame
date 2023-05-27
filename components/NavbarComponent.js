import React from 'react';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Righteous } from 'next/font/google';
import { FaHeartbeat } from 'react-icons/fa';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const NavbarComponent = ({
  setModalOpen,
  highscore,
  lives,
  router,
  address,
}) => {
  return (
    <>
      <div className='bg-thegreener justify-center fixed top-0 w-full flex flex-row space-x-2 h-fit py-2 hidden'>
        <div className='bg-thegreen px-4 py-2 rounded-md hover:cursor-pointer flex flex-col hover:shadow-theredbtn hover:shadow-lg'>
          <span onClick={() => setModalOpen(true)}>Leaderboard</span>
          {highscore && <small>Top: {highscore} secs.</small>}
        </div>
        <div className='mt-2'>
          <ConnectWallet
            auth={{
              loginOptional: false,
            }}
          />
        </div>
      </div>
      <div className='hidden md:absolute right-4 top-4  md:flex flex-col items-center justify-center'>
        <span
          className='bg-thegreen px-4 py-2 rounded-full hover:cursor-pointer hover:shadow-theredbtn hover:shadow-lg'
          onClick={() => setModalOpen(true)}
        >
          N&W S3 Leaderboard
        </span>
        {highscore && <small>High Score: {highscore} secs.</small>}
        <div className='mt-2'>
          <ConnectWallet
            auth={{
              loginOptional: false,
            }}
          />
        </div>
        <div
          className={`${righteous.className} flex justify-between font-bold px-2 py-1 bg-thepurple rounded-lg mt-3 w-48`}
        >
          <div className='flex space-x-1 hover:cursor-pointer'>
            <span className=''>{lives}</span> <FaHeartbeat size={20} />
          </div>
          {address && (
            <div className='flex space-x-1 hover:cursor-pointer'>
              <span
                className='hover:text-theblack'
                onClick={() => router.push(`/user-gallery/${address}`)}
              >
                profile
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
