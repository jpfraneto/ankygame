import Image from 'next/image';
import React from 'react';

const CharacterCard = ({ character, setDisplayedCharacter, setModalOpen }) => {
  return (
    <div
      onClick={() => {
        setDisplayedCharacter(character);
        setModalOpen(true);
      }}
      className='w-48 m-2 rounded-xl px-2 py-1 bg-thegreen border-thewhite border-2'
    >
      <h2 className='text-bold text-2xl mb-2'>{character.characterName}</h2>
      <div className='relative aspect-square rounded-xl overflow-hidden border-thewhite border mb-2'>
        <Image src={character.chosenImageUrl} fill />
      </div>
      <div>{character.traits.City}</div>
    </div>
  );
};

export default CharacterCard;
