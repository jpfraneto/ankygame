import React, { useState, useRef, useEffect } from 'react';
import StepsForGettingImage from '@component/components/StepsForGettingImage';
import { Righteous } from 'next/font/google';
import Button from './Button';
import { useRouter } from 'next/router';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';
import AnkyGalleryModal from './AnkyGalleryModal';
import Image from 'next/image';
import ShopModal from './ShopModal';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const products = [
  {
    name: 'Anky Genesis NFT',
    price: '8',
    description:
      'The Ankyverse woke up after an event that is called The Genesis.\n In it, 8.888 unique characters were generated. They are the first brave ones that will colonize this new world. \n They are the ones that started it all. \n Each one with its unique story. \n Each one with its unique set of personality traits.',
    image: '/store/genesis.png',
  },
  {
    name: 'Anky People NFT',
    price: '1',
    description:
      'Each time you come into Anky to write, you will have the opportunity to generate a unique NFT capturing the essence of what you wrote in an image. \n This NFT will be a snapshot of that exact moment of your life. \n Of that exact writing. \n Caught in a timeless piece of media that you will be able to use as you wish.',
    image: '/store/secondary.png',
  },
  // {
  //   name: 'Cannabis Ice Cream',
  //   price: '4',
  //   description:
  //     'Sometimes the intention to open the mind is not enough, and you need a little push. \n Our ice cream came into being with the power of music and good vibes, and that is what will be embedded in each scoop of it. \n Each bite will be a catapult into the magic of the universe. ',
  //   image: '/store/icecream.png',
  // },
  {
    name: 'Stickers Block',
    price: '2',
    description:
      'Stickers are one of the most simple toys, but at the same time, one of the most prone to generating connection between human beings. \n There is a memory that is embedded in each one of them. \n It is the fundamental give and receive energy of the universe condensed into a little sticky thing.',
    image: '/store/stickers.png',
  },
  {
    name: 'Coloring Book',
    price: '2',
    description:
      "Fill your kids life with color, painting alongside them. \n Or even do it for yourself, it will help you be less stressed. \n It may be that you don't know how to draw. That's perfectly fine.\n You can still paint. You can't get this one wrong.",
    image: '/store/coloringbook.png',
  },
  {
    name: "Children's Book",
    price: '6',
    description:
      'The first kids book with the universal language: Images. \n What if there was a book without a story, but the story was crafted by you each time you open it? \n Anky is a journey towards your imagination. \n Each one of these books is an opportunity into that.',
    image: '/store/childrensbook.png',
  },
  {
    name: 'Anky TV Subscription',
    price: '3',
    description:
      'The IP of Anky is open. Any person in the world can create a piece of content with it. \n Eventually, people from all over the world will create cartoons featuring different Anky characters. \n They will all be uploaded into Anky TV, which will be an eternal thread of this cartoons. \n Think of Cartoon Network, but inside the Ankyverse. \n And you can contribute to it.',
    image: '/store/ankytv.png',
  },
];

const Shop = ({}) => {
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [chosenProduct, setChosenProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const chooseProductForDisplay = i => {
    setChosenProduct(products[i]);
    console.log(products[i]);
    setModalOpen(true);
  };

  return (
    <div
      className='text-thewhite relative flex md:flex-row flex-col overflow-y-scroll w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
      }}
    >
      <div className='h-fit md:h-full w-screen md:w-96 overflow-y-scroll px-9 pt-6'>
        <h2 className={`${righteous.className}  text-3xl  `}>Shop</h2>
        <p className={`${righteous.className} mt-7 text-md `}>
          What is happening here is a new way of doing things. A blend between
          physical and digital with the intention of making you smile.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Our mission is to create products that your inner child will love.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Opening up the window to play. To play just for the sake of it.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          To light the spark of something that humanity lost: The capacity for
          playing.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Our children are the teachers of the future. It is time to listen to
          them.
        </p>
      </div>
      <div className='h-fit pb-8 md:h-full overflow-y-scroll w-full flex bg-theblack text-thewhite md:flex-row flex-col'>
        <div className='px-6 py-6 flex flex-wrap h-full justify-center '>
          {products.map((x, i) => {
            return (
              <div
                key={i}
                onClick={() => chooseProductForDisplay(i)}
                className='flex flex-col justify-center items-center'
              >
                <div
                  key={i}
                  style={{ width: '240px', height: '240px' }}
                  className='m-2 relative rounded-xl hover:border-thewhite hover:border hover:cursor-pointer overflow-hidden shadow-lg'
                >
                  <Image fill src={x.image} />
                </div>
                <small className={`${righteous.className} text-lg mb-0`}>
                  {x.name}
                </small>
                <small className='mt-0'>${x.price} APE</small>
              </div>
            );
          })}
        </div>
      </div>
      <ShopModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={chosenProduct}
      ></ShopModal>
    </div>
  );
};

export default Shop;
