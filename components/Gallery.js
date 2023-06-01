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

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

let ankys = [
  {
    index: 1,
    imagePrompt:
      'A strong dwarf with a hammer, ornate armor, and long, braided red hair.',
    characterDescription:
      "Borin Firebeard is a seasoned warrior, coming from the deepest caverns of the Earthen Realm.\nHis fiery red hair is a symbol of his clan's eternal flame. Known for his master craftsmanship and unyielding courage, he battles for honor and the prosperity of his people. Never one to back down from a challenge, Borin constantly seeks to push his limits.\nBehind the stoic and resilient exterior, he has a compassionate heart and is loved by his kin.",
    name: 'Borin Firebeard',
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
      'A sorcerer in royal blue robes, carrying a staff adorned with a glowing crystal, eyes glowing with arcane energy.',
    characterDescription:
      "Aelius Stormhand was born under a comet's streak, marking him for a destiny entwined with the Arcane.\nHe is a renowned scholar from the Ivory Tower, a mystical place where time bends to the rhythm of ancient spells. Aelius wields powerful magic with a graceful finesse that inspires awe and fear. Behind the spectacle of his magic, he is a man in search of knowledge, driven by an insatiable curiosity.\nHe seeks to uncover the secrets of the cosmos and use this knowledge for the betterment of all.",
    name: 'Aelius Stormhand',
  },
  {
    index: 5,
    imagePrompt:
      'A human knight in gleaming silver armor, wielding a large broadsword, and bearing a crest of a golden lion on his shield.',
    characterDescription:
      "Sir Galahad the Valiant, a beacon of hope from the kingdom of Lion's Heart, stands tall against the forces of darkness.\nKnown for his chivalry and honor, he embodies the virtues of a true knight. His radiant armor is as much a weapon as his broadsword, striking fear into the hearts of the wicked.\nDespite his formidable reputation, Galahad is humble, often found aiding the less fortunate.\nHis dream is to bring lasting peace to his kingdom and live out his days in a land free from conflict.",
    name: 'Sir Galahad the Valiant',
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
      'An orcish shaman adorned in tribal artifacts, carrying a staff of bones, and tattooed with vibrant tribal markings.',
    characterDescription:
      'Gorath Earthspeaker, hailing from the Bone Peaks, is an imposing figure.\nGuided by the spirits of his ancestors, Gorath is a bridge between the physical and spiritual worlds.\nHe wields the raw elemental forces with a balance that only few can achieve. Respected for his wisdom and feared for his power, Gorath maintains order in his tribe.\nDeep within his stern demeanor, he carries a longing for unity among the disparate tribes, a dream of an orc nation standing tall and proud.',
    name: 'Gorath Earthspeaker',
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

const Gallery = ({ userPrompt }) => {
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [chosenAnky, setChosenAnky] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const chooseAnkyForDisplay = i => {
    setChosenAnky(ankys[i - 1]);
    setModalOpen(true);
  };

  return (
    <div
      className='text-thewhite relative flex  overflow-y-scroll  w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 73px)',
      }}
    >
      <div className='h-full w-3/12 overflow-y-scroll  px-9 pt-6 bg-theblack'>
        <h2 className={`${righteous.className}  text-3xl  `}>What is this?</h2>
        <p className={`${righteous.className} mt-7 text-md `}>
          Anky is a special world that lives inside a game. But it's not just
          any game. It's a magical place where you can meet characters that are
          really a bit like you!
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          You see, each character you see in this gallery is special. Each one
          was born from a person's imagination and tells a story about them.
          It's as if they painted a picture using words and their picture turned
          into these characters!
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          You can also make your own special character. All you have to do is
          write a little story about yourself or what you want to be. Then, like
          magic, you will see a new character in the gallery. And guess what?
          That character is a bit like you!
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          Anky is just starting to grow. It's like a tiny seed that has just
          started to sprout. It might be a little confusing right now, just like
          a puzzle when you've only put a few pieces together. But as more and
          more people create their own characters, the picture will become
          clearer.
        </p>
        <p className={`${righteous.className} mt-7 text-md `}>
          And the best part is, each Anky character is like a magical car that
          takes you on an adventure in this game. So let's start the journey and
          grow this world together!
        </p>
      </div>
      <div className='h-full w-9/12 flex bg-thewhite text-theblack flex-col'>
        <h2
          className={`${righteous.className} px-9 mt-6 hover:text-thegreenbtn  text-3xl  hover:cursor-pointer`}
        >
          Ankys
        </h2>
        <div className='px-6 py-6 flex flex-wrap h-full justify-center overflow-y-scroll'>
          {ankys.map((x, i) => {
            return (
              <div className='flex flex-col justify-center items-center'>
                <div
                  key={i}
                  onClick={() => chooseAnkyForDisplay(x.index)}
                  style={{ width: '240px', height: '240px' }}
                  className='m-2 relative rounded-xl hover:cursor-pointer overflow-hidden shadow-lg'
                >
                  <Image fill src={`/ankys/${x.index}.png`} />
                </div>
                <small className={`${righteous.className} text-lg`}>
                  {x.name}
                </small>
              </div>
            );
          })}
        </div>
      </div>
      <AnkyGalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        anky={chosenAnky}
      ></AnkyGalleryModal>
    </div>
  );
};

export default Gallery;
