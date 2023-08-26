import React, { useState, useRef, useEffect } from 'react';
import StepsForGettingImage from '@component/components/StepsForGettingImage';
import { Righteous } from 'next/font/google';
import Button from './Button';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AnkyGeneratedGalleryModal from './AnkyGeneratedGalleryModal';
import Image from 'next/image';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const Gallery = ({ characters }) => {
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [chosenAnky, setChosenAnky] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const chooseAnkyForDisplay = i => {
    setChosenAnky(characters[i - 1]);
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
      <div className='h-1/2 md:h-full w-screen md:w-3/12 overflow-y-scroll px-9 pt-6 bg-theblack'>
        <h2 className={`${righteous.className}  text-3xl  `}>What is this?</h2>
        <p className={`${righteous.className} mt-7 text-md `}>
          Anky is a special world that lives inside a game. But it&apos;s not
          just any game. It&apos;s a magical place where you can meet characters
          that are really a bit like you.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          You see, each character that is part of this gallery has its unique
          story. Each one was born from a person&apos;s story and tells us about
          that person. It&apos;s as if they painted a picture using words and
          their picture turned into these characters.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          You can also make your own special character. All you have to do is
          write at least 3 minutes about yourself. Then, like magic, you will
          see a new character in the gallery. And guess what? That character is
          you.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Anky is just starting to grow. It&apos;s like a tiny seed that has
          just started to sprout. It might be a little confusing right now, just
          like a puzzle when you&apos;ve only put a few pieces together. But as
          more and more people create their own characters, the picture will
          become clearer.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          And the best part is, each Anky character is like a magical car that
          takes you on an adventure in this game. So let&apos;s start the
          journey and grow this world together.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Thank you for being here.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Thank you for being who you are.
        </p>
      </div>
      {characters && (
        <div className='h-1/2 pb-8 md:h-full w-screen md:w-9/12 overflow-y-scroll flex bg-thewhite text-theblack md:flex-col'>
          <div className='p-6 flex flex-wrap md:h-full justify-center '>
            {characters.map((x, i) => {
              return (
                <div
                  key={i}
                  className='flex flex-col justify-center items-center'
                >
                  <div
                    key={i}
                    onClick={() => chooseAnkyForDisplay(x.index)}
                    className='m-2 relative rounded-xl hover:cursor-pointer overflow-hidden shadow-lg'
                  >
                    <Image fill src={x.chosenImageUrl} />
                  </div>
                  <small className={`${righteous.className} text-lg`}>
                    {x.name}
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <AnkyGeneratedGalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        anky={chosenAnky}
      ></AnkyGeneratedGalleryModal>
    </div>
  );
};

export default Gallery;

export async function getServerSideProps(context) {
  try {
    const characters = await prisma.character.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return {
      props: { characters: JSON.parse(JSON.stringify(characters)) },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {},
    };
  }
}
