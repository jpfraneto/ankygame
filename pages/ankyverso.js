import React, { useState, useRef } from 'react';
import Button from '@component/components/Button';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Righteous } from 'next/font/google';
import { useAddress } from '@thirdweb-dev/react';
import {
  getCharacterSystemMessage,
  getCharacterUserContent,
  getCharacterTraits,
  worlds,
  characterTypes,
} from '@component/lib/ankyGenerationMessagesForTraits';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const StepsForGettingImage = ({ text, time }) => {
  const address = useAddress();
  const [characterType, setCharacterType] = useState(null);
  const [systemMessage, setSystemMessage] = useState('');
  const [loadingAnkyResponse, setLoadingAnkyResponse] = useState(false);
  const [thisCharacter, setThisCharacter] = useState(null);
  const [chosenWorld, setChosenWorld] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [ankyResponded, setAnkyResponded] = useState(false);
  const [promptForMidjourney, setPromptForMidjourney] = useState('');
  const [imagineAPIid, setImagineAPIid] = useState(null);
  const [midjourneyLoading, setMidjourneyLoading] = useState(false);
  const [imagesReadyUrl, setImagesReadyUrl] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const askChatGTPforCharacterInformation = async () => {
    setLoadingAnkyResponse(true);
    try {
      const response = await fetch('/api/ankynfts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemMessage, userMessage }),
      });
      setLoadingAnkyResponse(false);
      const data = await response.json();
      if (data.error) return alert('There was an error, please try again.');
      console.log('the data from the server is: ', data);
      setPromptForMidjourney(
        `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. ${data.promptForMidjourney}`
      );
      setThisCharacter(x => {
        return {
          ...x,
          promptForMidjourney: `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. ${data.promptForMidjourney}`,
          name: data.characterName,
          characterStory: data.characterBackstory,
        };
      });
      setAnkyResponded(true);
    } catch (error) {
      alert('There was an error in here. I will work on fixing it.');
    }
  };
  const promptMidjourneyForImages = async () => {
    setMidjourneyLoading(true);
    try {
      const response = await fetch('/api/ankymidjourney', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptForMidjourney: thisCharacter.promptForMidjourney,
        }),
      });
      const data = await response.json();
      console.log('the data from the server is: ', data);
      setImagineAPIid(data.midjourneyImageId);
      setMidjourneyLoading(false);
      const intervalIddd = setInterval(() => {
        fetchImagineApiForImage();
      }, 11111);
      setIntervalId(intervalIddd);
    } catch (error) {
      alert('There was an error in here. I will work on fixing it.');
    }
  };

  const randomPick = arr => arr[Math.floor(Math.random() * arr.length)];

  const fetchImagineApiForImage = async () => {
    const response = await fetch('/api/ankymidjourney', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imagineAPIid: imagineAPIid,
      }),
    });
    const data = await response.json();
    console.log('the data is: ', data);
    if (data.data) setImagesReadyUrl(data.data.upscaled_urls[0]);
  };

  const getNewCharacter = async () => {
    if (!characterType) return;
    const character = await getCharacterTraits(characterType);
    let newCharacter = { ...character.characterTraits };
    newCharacter.world = chosenWorld;
    newCharacter.predominantChakra = chosenWorld.chakra;
    newCharacter.characterType = characterType;

    const randomIndex = randomPick([1, 2, 3]);
    console.log('the chosenWorld is: ', chosenWorld);
    console.log('The city is: ', chosenWorld.cities[randomIndex - 1]);

    newCharacter.city = chosenWorld.cities[randomIndex - 1];

    setThisCharacter(newCharacter);
    const aloja = await getCharacterSystemMessage(newCharacter);
    const chau = await getCharacterUserContent(newCharacter);

    setSystemMessage(aloja);
    setUserMessage(chau);
  };

  const handleChangeWorld = value => {
    console.log(worlds[value - 1]);
    setChosenWorld(worlds[value - 1]);
  };
  const handleChangeCharacterType = value => {
    setCharacterType(value);
  };

  return (
    <div className='text-center flex h-screen w-full'>
      <div className='p-4 bg-theblue h-full'>
        <p className='text-thewhite'>Choose World</p>
        <select
          onChange={e => {
            handleChangeWorld(e.target.value);
          }}
        >
          <option value=''>Choose World</option>
          {worlds.map((x, i) => {
            return <option value={x.chakra}>{x.name}</option>;
          })}
        </select>{' '}
        <p className='text-thewhite mt-2'>Choose Character Type</p>
        <select
          onChange={e => {
            handleChangeCharacterType(e.target.value);
          }}
        >
          <option value=''>Choose Character Type</option>
          {characterTypes.map((x, i) => {
            return <option value={x}>{x}</option>;
          })}
        </select>
        <div className='mt-4 bg-thegreen border-theblack p-2 rounded-xl'>
          <button onClick={getNewCharacter}>Get New Character</button>
          <br />
          <br />
          <button className='mt-2' onClick={() => console.log(thisCharacter)}>
            Log Character
          </button>
        </div>
      </div>
      <div className='text-thewhite p-4'>
        {chosenWorld && (
          <div>
            <p>
              {chosenWorld.name} || {characterType}
            </p>
            {systemMessage && (
              <div className='text-thewhite mt-8'>
                <h2>The System Message is:</h2>
                <p>{systemMessage}</p>
              </div>
            )}
            {userMessage && (
              <div className='text-thegreen mt-8'>
                <h2>The User Message is:</h2>
                <p>{userMessage}</p>
              </div>
            )}
            {systemMessage && userMessage && (
              <button
                className='px-2 py-1 bg-thegreen border-thewhite'
                onClick={askChatGTPforCharacterInformation}
              >
                PROMPT ANKY WITH THIS ELEMENTS
              </button>
            )}

            {loadingAnkyResponse && <p>ANKY IS THINKNG...</p>}
            <br />
            {ankyResponded && (
              <div className='w-9/12 p-4 bg-thelightblue rounded-2xl mx-auto my-4'>
                <h2 className='mb-4 text-2xl'>{thisCharacter.name}</h2>
                {thisCharacter.characterStory.split('\n').map((x, i) => {
                  return <p className='text-theblack mb-2'>{x}</p>;
                })}
                {promptForMidjourney && (
                  <button
                    className='px-2 py-1 bg-theblack text-thewhite border rounded-xl hover:text-thegreen border-thewhite'
                    onClick={promptMidjourneyForImages}
                  >
                    {midjourneyLoading
                      ? 'Loading imagine api response...'
                      : 'PROMPT IMAGINE API'}
                  </button>
                )}
                {imagineAPIid && (
                  <div className='w-9/12 mt-4 aspect-square relative mx-auto border-thewhite border-2 rounded-xl overflow-hidden'>
                    <Image
                      alt='ANKY'
                      src={imagesReadyUrl || 'https://s.mj.run/YLJMlMJbo70'}
                      fill
                    />
                    {!imagesReadyUrl && (
                      <p className='z-3 bottom-0 text-thewhite text-2xl absolute left-8'>
                        I AM BEING.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsForGettingImage;
