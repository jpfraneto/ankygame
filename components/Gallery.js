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
      'A robust man with a straw hat, weather-beaten overalls, and a gleaming hoe slung over his shoulder.',
    characterDescription:
      'This humble farmer cultivates the fertile lands of the Green Valley.\nWhile seemingly ordinary, Fergus harbors numerous secrets. Some say he was once a legendary hero, others whisper of a hidden treasure buried under his farm.\nHis weathered hands and sun-beaten face are testament to a lifetime of hard work, while his twinkling eyes hint at the countless stories he has yet to tell.',
    name: 'Mislirien',
  },
  {
    index: 2,
    imagePrompt:
      'A nimble elf with a longbow, adorned in green and brown, blending seamlessly into the forest.',
    characterDescription:
      'Althirion Greenleaf is an elven ranger from the ancient woods of Elendir.\nHis skills in archery and natural camouflage make him a silent protector of the forest. Brought up in harmony with nature, he upholds the balance between the creatures of the forest and his kin.\nHe is loved for his storytelling around the campfire, sharing tales of mysterious beasts and long-forgotten elfin songs.\nDespite his cheerful disposition, Althirion is haunted by the encroachment of the human kingdoms on his homeland, fueling his dedication to protect his home.',
    name: 'Auzga',
  },
  {
    index: 3,
    imagePrompt:
      'A rogue assassin in black garb, dual-wielding daggers, with a mysterious and shadowy aura.',
    characterDescription:
      "Serena Nightshade, born in the treacherous underbelly of the city of Duskfall, is feared and respected.\nFrom an early age, she was trained in the art of stealth and deception, making her an unseen shadow in the dark alleys.\nHer loyalty lies with the Silent Daggers, a notorious guild she leads with cunning and determination. Serena carries the burden of her dark past, often showing a softer side to the few she trusts.\nHer one guiding principle is to protect those who can't protect themselves.",
    name: 'Krysta',
  },
  {
    index: 4,
    imagePrompt:
      'A serene figure in flowing robes, performing a complex martial arts pose with a meditative look on his face.',
    characterDescription:
      'A revered martial artist from the Whispering Peaks.\nHe is the embodiment of tranquility, having mastered control over body and mind through years of disciplined practice.\nHis wisdom is sought by many, for he is the beacon that guides lost souls through the storm, and his teachings have brought harmony to many troubled hearts.',
    name: 'Isara',
  },
  {
    index: 5,
    imagePrompt:
      "A man dressed in fine servant's attire, a tray of exquisite delicacies in hand, his eyes shining with an unwavering loyalty.",
    characterDescription:
      "He serves the great lord of a bustling city, his loyalty earning him much respect among his peers. His humble demeanor belies the strength of his devotion.\nWhile he's often in the shadow of power, Leoric's integrity shines through, proving that sometimes the greatest power comes from serving others.",
    name: 'Ryndria',
  },
  {
    index: 6,
    imagePrompt:
      'A mermaid with shimmering teal scales, flowing auburn hair, and a crown made of coral and pearls.',
    characterDescription:
      "Calypso of the Azure Depths, queen of the undersea kingdom of Coral Throne, possesses a beauty that belies her strength.\nHer voice is a captivating melody that has soothed savage sea-beasts and quelled storms. She rules her domain with wisdom and grace, striving for harmony between the sea and land dwellers.\nDespite the serenity of her kingdom, Calypso's heart yearns for adventure, often finding herself swimming with the currents of the open sea, exploring the vast and unknown.",
    name: 'Isara',
  },
  {
    index: 7,
    imagePrompt:
      'A travel-worn figure, backpack slung over one shoulder, looking at the horizon with an expression of curious anticipation.',
    characterDescription:
      'An adventurer at heart.\nHis days are spent wandering the sprawling cities and quaint villages of the world, his thirst for knowledge as insatiable as his love for the open road.\nEvery winding path is a story, every new face a book to read, and in his journey of endless discovery, Roderick seeks to understand the vast tapestry of life.',
    name: 'Savitaios',
  },
  {
    index: 8,
    imagePrompt:
      'A fairy with glistening wings, carrying a wand topped with a dewdrop, dressed in petals and leaves.',
    characterDescription:
      'Lumina Dewsparkle, hailing from the Dewdrop Vale, is a tiny sprite with the heart of a lion.\nShe harnesses the natural magic of her homeland, her spells often manifesting in glimmers of light and soft, healing radiance. Known for her cheerful and friendly demeanor, Lumina is always at the center of any fairy gathering.\nShe believes in the sanctity of life and dreams of a day when the magical and mortal realms live in peaceful coexistence.',
    name: 'Dalmira',
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
    name: 'Chrysidius',
  },
  {
    index: 11,
    imagePrompt:
      'A dragonkin warrior in scale armor, brandishing a fiery sword, wings partially unfurled in a display of might.',
    characterDescription:
      "Kael'tharax Flameheart, hailing from the volcanic land of Emberpeak, is a force to be reckoned with.\nHis powerful physique and fiery spirit make him a formidable foe and a reliable ally. He is the warden of his land, ensuring the safety of the dragonkin from threats within and outside their realm.\nDespite his intimidating presence, Kael'tharax values honor above all else, a quality that has earned him respect among all dragonkin.\nHis dream is to see his people rise from their isolation and stand as equals among the races of the world.",
    name: 'Xylan',
  },
  {
    index: 12,
    imagePrompt:
      'An angelic being in white and gold robes, with feathered wings radiating a soft light, holding a staff with a top shaped like an intricate key.',
    characterDescription:
      'Seraphiel the Keybearer is a celestial from the divine realms.\nHer very presence exudes an aura of peace and tranquility. She carries the Key of Divine Will, a symbol of her role as a guide for lost souls.\nHer compassion is limitless, offering guidance to those in need, regardless of their origin or destiny.\nDespite her celestial duty, Seraphiel holds a deep fascination with the mortal realm and often finds herself wandering its varied lands, seeking to understand the mortal experience.',
    name: 'Hanara',
  },
  {
    index: 13,
    imagePrompt:
      "A vibrant character with sparkling eyes, wild hair, and colorful tattoos covering his arms. He carries a big backpack full of curious objects. He's seen with a garden hoe in one hand, a paintbrush in the other, and a mischievous smile on his face.",
    characterDescription:
      "Lively spirit and a cultivator of life. Hailing from the southern lands of Anky, he has roamed the multiverse, learning and growing with each step. This cheerful tattooist by trade also loves to indulge in the world's culinary delights, especially those from his homeland.\n\nFelipe has a boundless love for gardening, often spending long hours nurturing his plants with his daughter Mara and their loyal dog Maya. Among all, cucumbers hold a special place in his heart, teaching him lessons about sensitivity and attention.\n\nFelipe embodies the free spirit of Anky, ever exploring and ever present. His journey from the depths of self to the expanse of the multiverse, from the physical to the abstract, and from language to silence, paints a vibrant image of the world. His stories resonate with the rhythm of life, revealing the multidimensional nature of existence, one moment at a time. His infectious laughter and boundless energy leave a trail of joy wherever he goes. But his true journey, the one that matters the most, is his quest to answer the question: 'Who am I?'",
    name: 'Chrysera',
  },
  {
    index: 14,
    imagePrompt:
      "A vibrant character with sparkling eyes, wild hair, and colorful tattoos covering his arms. He carries a big backpack full of curious objects. He's seen with a garden hoe in one hand, a paintbrush in the other, and a mischievous smile on his face.",
    characterDescription:
      "Anxious grad student, consumed by a whirlwind of emotions and thoughts. \nA deep thinker, he's continually pondering on philosophical dilemmas and ethical questions. Despite his knowledge and skills, he harbors deep-seated insecurities and fears about his capabilities and his future.\nHe worries constantly about the world, his role in it, his responsibilities towards others, and his personal life.\nHe's also grappling with the issue of his own self-worth and the pressure to prove himself. His anxieties often get in the way of his focus, making him question his decisions, his choices, and the path he has embarked on.\nAt heart, he is someone who wants to do meaningful work and make a difference, but he struggles with the fear that he might not be able to fulfill these aspirations.",
    name: 'Krylacia',
  },
  {
    index: 15,
    imagePrompt:
      'A young man stands at the edge of a baseball field, baseball cap turned backwards, eyes determined. In one hand, he holds a bat; the other hand is full of crumpled pieces of paper filled with equations and data points. Behind him, a chalkboard stands tall, brimming with math formulas and baseball strategies. Far off in the distance, we see a group of people, perhaps his family and friends, watching him with mixed emotions of concern and admiration.',
    characterDescription:
      "Young, ambitious man with a deep love for baseball and mathematics. He's highly self-driven and intelligent, constantly looking for ways to revolutionize the game he loves using his skills in math and data science. He values his family and friends greatly, yet often finds himself torn between spending time with them and dedicating himself to his work. He is highly self-critical and fears showing his flaws, always aiming for perfection. At the same time, he realizes that he's often overly harsh on himself, and yearns to adopt a more forgiving and positive attitude towards his own work and self. The struggle with his identity and his constant strive for perfection make him anxious, but his determination and passion for baseball and math keep him going.",
    name: 'Delphina',
  },
  {
    index: 16,
    imagePrompt:
      'A vibrant setting depicts the evening in full swing at an eclectic gathering spot. People of all walks of life, some engaging in deep conversations, some lost in their creative pursuits, fill the space. In one corner, someone is making something intricate and fascinating, a testament to the creative freedom fostered by "Buildspace." The protagonist, visibly excited, is in the middle of this lively atmosphere, observing all these interactions with joy and admiration. Ambient music permeates the scene, harmonizing with the hum of ongoing conversations and the soft click-clack of keyboard strokes.',
    characterDescription:
      "Individual with a deep appreciation for human connections and creative endeavors.\nHe finds joy and inspiration in the energy of social environments and are excited to learn from others. The character is also the creator of 'Buildspace', a platform that allows for creative expression, and they take immense pride in the amazing things people are creating there.\nDespite his accomplishments, he often forgets to take moments of pause in their day, a realization they have come to during their time at 'Nights & Weekends'.\nThis character is thoughtful, reflective, and passionate about their work and the creativity of others.",
    name: 'Krypharla',
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
      className='text-thewhite relative flex md:flex-row flex-col overflow-y-scroll w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
      }}
    >
      <div className='h-fit md:h-full w-screen md:w-96 overflow-y-scroll px-9 pt-6 '>
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
      <div className='h-fit pb-8 md:h-full overflow-y-scroll w-full flex bg-theblack text-thewhite md:flex-row flex-col'>
        <div className='px-6 py-6 flex  flex-wrap h-full justify-center '>
          {ankys.map((x, i) => {
            return (
              <div
                key={i}
                className='flex flex-col justify-center items-center'
              >
                <div
                  key={i}
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
