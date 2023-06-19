import React, { useState, useRef, useEffect } from 'react';
import StepsForGettingImage from '@component/components/StepsForGettingImage';
import { Righteous } from 'next/font/google';
import { useRouter } from 'next/router';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';
import NewAnkyGalleryModal from '@component/components/NewAnkyGalleryModal';
import Image from 'next/image';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Mint = ({ ankys }) => {
  console.log('inside the mint page, the ankys are: ', ankys);
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [chosenAnky, setChosenAnky] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [randomNumber, setRandomNumber] = useState(false);

  const chooseAnkyForDisplay = i => {
    setChosenAnky(ankys[i]);
    setModalOpen(true);
  };

  return (
    <div
      className='text-thewhite relative flex md:flex-row flex-col overflow-y-scroll w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 73px)',
      }}
    >
      <div className='h-fit md:h-full w-screen md:w-3/12 overflow-y-scroll  px-9 pt-6 bg-theblack'>
        <h2 className={`${righteous.className}  text-3xl  `}>Mint Info</h2>
        <p className={`${righteous.className} mt-7 text-md `}>
          The Ankyverse will starts its genesis on the 21th of June of 2023, at
          10:57 am eastern time.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          From there, each day one new world will be generated, along with the
          1111 characters that will initially populate those worlds.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Each one of them unique, using a unique system of traits as a prompt.
          In this colletion, the traits will be embedded in the personality of
          the character. In the role that it plays in the development of the
          ankyverse.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          This is just the beginning.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Mint prize will be 0.01618 eth, and mint will be open after the
          genesis event ends successfully.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>Location TBA.</p>
      </div>
      <div className='h-fit pb-8 md:h-full w-screen md:w-9/12 overflow-y-scroll flex bg-thewhite text-theblack flex-col'>
        <div className='px-6 py-6 flex flex-wrap h-full justify-center '>
          {ankys &&
            ankys.map((x, i) => {
              return (
                <div
                  key={i}
                  className='flex flex-col justify-center items-center'
                >
                  <div
                    key={i}
                    onClick={() => chooseAnkyForDisplay(i)}
                    style={{ width: '240px', height: '240px' }}
                    className='m-2 relative rounded-xl hover:cursor-pointer overflow-hidden shadow-lg'
                  >
                    <Image fill src={x.upscaledImageUrls[2]} />
                  </div>
                  <small className={`${righteous.className} text-lg`}>
                    {x.name}
                  </small>
                </div>
              );
            })}
        </div>
      </div>
      <NewAnkyGalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        anky={chosenAnky}
      ></NewAnkyGalleryModal>
    </div>
  );
};

export default Mint;

export async function getStaticProps() {
  // Call an external API endpoint to get ankys
  const res = await fetch('http://143.244.203.49:3000/api/characters');
  const ankys = await res.json();
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  if (!ankys)
    return {
      props: {},
    };
  const returnObject = ankys.fetalCharacters.filter(x => x.state === 'FETAL');
  shuffleArray(returnObject);

  // By returning { props: ankys }, the Mint component
  // will receive `ankys` as a prop at build time
  return {
    props: {
      ankys: JSON.parse(JSON.stringify(returnObject)),
    },
  };
}
