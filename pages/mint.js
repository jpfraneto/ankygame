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

let ankys = [
  {
    index: 1,
    imagePrompt:
      'A robust man with a straw hat, weather-beaten overalls, and a gleaming hoe slung over his shoulder.',
    characterDescription:
      'This humble farmer cultivates the fertile lands of the Green Valley.\nWhile seemingly ordinary, Fergus harbors numerous secrets. Some say he was once a legendary hero, others whisper of a hidden treasure buried under his farm.\nHis weathered hands and sun-beaten face are testament to a lifetime of hard work, while his twinkling eyes hint at the countless stories he has yet to tell.',
    name: 'Fergus the Tillerman',
  },
  {
    index: 2,
    imagePrompt:
      'A nimble elf with a longbow, adorned in green and brown, blending seamlessly into the forest.',
    characterDescription:
      'Althirion Greenleaf is an elven ranger from the ancient woods of Elendir.\nHis skills in archery and natural camouflage make him a silent protector of the forest. Brought up in harmony with nature, he upholds the balance between the creatures of the forest and his kin.\nHe is loved for his storytelling around the campfire, sharing tales of mysterious beasts and long-forgotten elfin songs.\nDespite his cheerful disposition, Althirion is haunted by the encroachment of the human kingdoms on his homeland, fueling his dedication to protect his home.',
    name: 'Althirion Greenleaf',
  },
  {
    index: 3,
    imagePrompt:
      'A rogue assassin in black garb, dual-wielding daggers, with a mysterious and shadowy aura.',
    characterDescription:
      "Serena Nightshade, born in the treacherous underbelly of the city of Duskfall, is feared and respected.\nFrom an early age, she was trained in the art of stealth and deception, making her an unseen shadow in the dark alleys.\nHer loyalty lies with the Silent Daggers, a notorious guild she leads with cunning and determination. Serena carries the burden of her dark past, often showing a softer side to the few she trusts.\nHer one guiding principle is to protect those who can't protect themselves.",
    name: 'Serena Nightshade',
  },
  {
    index: 4,
    imagePrompt:
      'A serene figure in flowing robes, performing a complex martial arts pose with a meditative look on his face.',
    characterDescription:
      'A revered martial artist from the Whispering Peaks.\nHe is the embodiment of tranquility, having mastered control over body and mind through years of disciplined practice.\nHis wisdom is sought by many, for he is the beacon that guides lost souls through the storm, and his teachings have brought harmony to many troubled hearts.',
    name: "Master Zen'Han",
  },
  {
    index: 5,
    imagePrompt:
      "A man dressed in fine servant's attire, a tray of exquisite delicacies in hand, his eyes shining with an unwavering loyalty.",
    characterDescription:
      "He serves the great lord of a bustling city, his loyalty earning him much respect among his peers. His humble demeanor belies the strength of his devotion.\nWhile he's often in the shadow of power, Leoric's integrity shines through, proving that sometimes the greatest power comes from serving others.",
    name: 'Leoric the Steward',
  },
  {
    index: 6,
    imagePrompt:
      'A mermaid with shimmering teal scales, flowing auburn hair, and a crown made of coral and pearls.',
    characterDescription:
      "Calypso of the Azure Depths, queen of the undersea kingdom of Coral Throne, possesses a beauty that belies her strength.\nHer voice is a captivating melody that has soothed savage sea-beasts and quelled storms. She rules her domain with wisdom and grace, striving for harmony between the sea and land dwellers.\nDespite the serenity of her kingdom, Calypso's heart yearns for adventure, often finding herself swimming with the currents of the open sea, exploring the vast and unknown.",
    name: 'Calypso of the Azure Depths',
  },
  {
    index: 7,
    imagePrompt:
      'A travel-worn figure, backpack slung over one shoulder, looking at the horizon with an expression of curious anticipation.',
    characterDescription:
      'An adventurer at heart.\nHis days are spent wandering the sprawling cities and quaint villages of the world, his thirst for knowledge as insatiable as his love for the open road.\nEvery winding path is a story, every new face a book to read, and in his journey of endless discovery, Roderick seeks to understand the vast tapestry of life.',
    name: 'Roaming Roderick',
  },
  {
    index: 8,
    imagePrompt:
      'A fairy with glistening wings, carrying a wand topped with a dewdrop, dressed in petals and leaves.',
    characterDescription:
      'Lumina Dewsparkle, hailing from the Dewdrop Vale, is a tiny sprite with the heart of a lion.\nShe harnesses the natural magic of her homeland, her spells often manifesting in glimmers of light and soft, healing radiance. Known for her cheerful and friendly demeanor, Lumina is always at the center of any fairy gathering.\nShe believes in the sanctity of life and dreams of a day when the magical and mortal realms live in peaceful coexistence.',
    name: 'Lumina Dewsparkle',
  },
  {
    index: 9,
    imagePrompt:
      'A gnome tinkerer in leather apron, goggles perched on his head, surrounded by an array of intricate devices and contraptions.',
    characterDescription:
      "Gizmo Fiddlewrench is a master inventor from the bustling town of Cogwheel Cove.\nHis genius is unmatched, with his designs often revolutionizing the way of life for his fellow gnomes.\nOften found in his workshop, covered in grease, Gizmo is always ready with a smile and a new invention to show off.\nUnderneath his exuberant and eccentric exterior, Gizmo is driven by a deep desire to prove that size does not define one's potential.",
    name: 'Gizmo Fiddlewrench',
  },
  {
    index: 10,
    imagePrompt:
      'A centaur archer in battle gear, with a quiver full of feathered arrows and a long, flowing mane.',
    characterDescription:
      'Arion Windrunner, a guardian from the Plains of Elysium, is a fierce protector of his herd.\nHis skill with the bow is unrivaled, and his charges are a sight to behold.\nHe is a free spirit, preferring the openness of the plains to the confines of a settlement. Despite his rough exterior, Arion is deeply loyal, willing to face any threat to ensure the safety of his herd.\nHis dream is to lead his people to a land where they can gallop free, unthreatened by the encroaching human kingdoms.',
    name: 'Arion Windrunner',
  },
  {
    index: 11,
    imagePrompt:
      'A dragonkin warrior in scale armor, brandishing a fiery sword, wings partially unfurled in a display of might.',
    characterDescription:
      "Kael'tharax Flameheart, hailing from the volcanic land of Emberpeak, is a force to be reckoned with.\nHis powerful physique and fiery spirit make him a formidable foe and a reliable ally. He is the warden of his land, ensuring the safety of the dragonkin from threats within and outside their realm.\nDespite his intimidating presence, Kael'tharax values honor above all else, a quality that has earned him respect among all dragonkin.\nHis dream is to see his people rise from their isolation and stand as equals among the races of the world.",
    name: "Kael'tharax Flameheart",
  },
  {
    index: 12,
    imagePrompt:
      'An angelic being in white and gold robes, with feathered wings radiating a soft light, holding a staff with a top shaped like an intricate key.',
    characterDescription:
      'Seraphiel the Keybearer is a celestial from the divine realms.\nHer very presence exudes an aura of peace and tranquility. She carries the Key of Divine Will, a symbol of her role as a guide for lost souls.\nHer compassion is limitless, offering guidance to those in need, regardless of their origin or destiny.\nDespite her celestial duty, Seraphiel holds a deep fascination with the mortal realm and often finds herself wandering its varied lands, seeking to understand the mortal experience.',
    name: 'Seraphiel the Keybearer',
  },
];

const Mint = ({}) => {
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
      className='text-thewhite relative flex md:flex-row flex-col w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
      }}
    >
      <div className=' md:h-full w-screen md:w-3/12 overflow-y-scroll px-9 pt-6 bg-theblack'>
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
      <div className='pb-8 md:h-full w-screen md:w-9/12 overflow-y-scroll flex bg-thewhite text-theblack md:flex-col'>
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
                    <Image fill src={`/newgallery/${x.index}.png`} />
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
