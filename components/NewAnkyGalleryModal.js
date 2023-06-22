import Image from 'next/image';
import { Righteous } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const NewAnkyGalleryModal = ({ isOpen, onClose, children, anky }) => {
  if (!isOpen) return null;
  console.log('the anky is:', anky);

  return (
    <div className='fixed top-0 left-0 z-10  h-screen w-screen flex items-center justify-center bg-opacity-60 bg-theblack'>
      <div className='bg-thewhite flex flex-col md:flex-row justify-start items-center text-theblack h-4/5 md:h-3/5 px-4 ,md:max-h-96 overflow-y-scroll py-8 relative rounded-lg w-10/12 md:w-3/5 md:max-h-full my-2 overflow-auto'>
        <div className=' h-96 md:h-full aspect-square relative overflow-hidden rounded-xl'>
          <Image src={`/newgallery/${anky.index}.png`} fill alt={anky.name} />
        </div>
        <div className='flex flex-col px-3 w-full md:w-3/5 overflow-y-scroll h-full pb-2 items-start mb-auto pt-1 justify-start'>
          <h2 className={`${righteous.className} text-3xl my-2 `}>
            {anky.name}
          </h2>
          <div className=''>
            {anky.characterDescription.split('\n').map((x, i) => {
              return (
                <p key={i} className={`${righteous.className} mb-2`}>
                  {x}
                </p>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          type='button'
          className='absolute top-0 right-0 mx-4 text-red-600 hover:text-red-800 font-bold text-2xl'
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default NewAnkyGalleryModal;
