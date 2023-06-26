import { useState, useEffect } from 'react';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <ul>
        {characters.map((character, index) => (
          <li key={index}>{character.characterName}</li>
        ))}
      </ul>
    </div>
  );
}
