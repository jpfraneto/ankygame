import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ subsets: ['latin'], weight: ['400'] });

const TheMonumentalGame = () => {
  const [musicOn, setMusicOn] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    if (musicOn) {
      const audio = new Audio('/assets/music/1.mp3');
      audio.play();
      const nextAudioFiles = [audio];
      for (let i = 2; i <= 5; i++) {
        const nextAudio = new Audio(`/assets/music/${i}.mp3`);
        nextAudioFiles.push(nextAudio);
        nextAudioFiles[i - 2].addEventListener('ended', function () {
          nextAudioFiles[i - 1].play();
        });
      }
      setAudioFiles(nextAudioFiles);
    } else if (audioFiles.length) {
      audioFiles.forEach(audio => audio.pause());
      setAudioFiles([]);
    }
  }, [musicOn]);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen z-50 bg-thered'>
      {/* Background Image */}
      <div
        className='absolute top-0 left-0 w-screen  h-screen bg-cover bg-center z-10'
        style={{ backgroundImage: 'url(/images/the-monumental-game.jpeg)' }}
      ></div>

      {/* Textarea */}
      <textarea
        className='absolute top-0 left-0 w-full h-full bg-transparent p-4 font-dancing text-theblack z-20'
        placeholder='Add'
      ></textarea>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel='Music Modal'
        className={`${righteous.className} flex items-center justify-center fixed inset-0 z-50 outline-none focus:outline-none`}
        overlayClassName='fixed inset-0 bg-theblack opacity-100 z-40'
      >
        <div className='relative w-auto mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative p-6 flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none'>
            <h3 className='text-3xl '>welcome</h3>

            <div className='relative  flex-auto'>
              <p className='my-4 text-gray-600 text-lg leading-relaxed'>
                Anky is a sensorial experience, and it all starts with sound. Do
                you want to navigate the journey through this website using
                music? (highly recommended).
              </p>
            </div>
            <div className='flex space-x-2'>
              <button
                className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-70'
                type='button'
                onClick={() => {
                  setMusicOn(true);
                  setModalOpen(false);
                }}
              >
                Yes
              </button>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-70'
                type='button'
                onClick={() => {
                  setMusicOn(false);
                  setModalOpen(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TheMonumentalGame;
