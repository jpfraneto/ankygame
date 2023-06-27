import { useState, useEffect } from 'react';
import CharacterCard from '@component/components/CharacterCard';
import AnkyGeneratedGalleryModal from '@component/components/AnkyGeneratedGalleryModal';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCharacter, setDisplayedCharacter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchCharacters() {
    setIsLoading(true);
    const res = await fetch('/api/getcharacters');
    const data = await res.json();
    console.log('the characters are: ', data);
    setCharacters(data);
    setIsLoading(false);
  }

  return (
    <div>
      <button
        className='bg-thered text-thewhite px-2 py-1'
        onClick={fetchCharacters}
      >
        Fetch characters
      </button>

      {isLoading && <div>Loading...</div>}
      <div className='flex flex-row flex-wrap justify-center'>
        {characters.map((character, index) => (
          <CharacterCard
            setDisplayedCharacter={setDisplayedCharacter}
            key={index}
            setModalOpen={setModalOpen}
            character={character}
          />
        ))}
      </div>
      <AnkyGeneratedGalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        anky={displayedCharacter}
      ></AnkyGeneratedGalleryModal>
    </div>
  );
}
