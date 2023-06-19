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
  const [imagineId, setImagineId] = useState(null);
  const [characterAdded, setCharacterAdded] = useState(null);
  const [imageProgress, setImageProgress] = useState(null);
  const [midjourneyLoading, setMidjourneyLoading] = useState(false);
  const [imagesReadyUrl, setImagesReadyUrl] = useState(null);
  const [loadingAddCharacter, setLoadingAddCharacter] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [chosenImageUrl, setChosenImageUrl] = useState('');
  const [upscaledImages, setUpscaledImages] = useState([
    'https://s.mj.run/YLJMlMJbo70',
    'https://s.mj.run/YLJMlMJbo70',
    'https://s.mj.run/YLJMlMJbo70',
    'https://s.mj.run/YLJMlMJbo70',
  ]);

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
      promptMidjourneyForImages(
        `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. ${data.promptForMidjourney}`
      );
    } catch (error) {
      alert('There was an error in here. I will work on fixing it.');
    }
  };
  const promptMidjourneyForImages = async prompt => {
    setMidjourneyLoading(true);
    try {
      const response = await fetch('/api/ankymidjourney', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptForMidjourney: prompt,
        }),
      });
      const data = await response.json();
      console.log('the data from the server is AC:  ', data);
      console.log('the midjourney image id is: ', data.midjourneyImageId);
      setImagineId(data.midjourneyImageId);
      setMidjourneyLoading(false);
      const intervalIddd = setInterval(() => {
        fetchImagineApiForImage(data.midjourneyImageId, intervalIddd);
      }, 11111);
      setIntervalId(intervalIddd);
    } catch (error) {
      console.log('the error was: ', error);
      alert('There was an error in here. I will work on fixing it.');
    }
  };

  const randomPick = arr => arr[Math.floor(Math.random() * arr.length)];

  const fetchImagineApiForImage = async (id, intervalID) => {
    console.log('the imagine api id is: ', id);
    const response = await fetch(`/api/ankymidjourney/${id}`, {
      method: 'GET',
    });
    const data = await response.json();
    console.log('the data inside the fetchImagineApiIs: ', data);
    setImageProgress(data.imageData.progress);
    if (
      data.imageData.upscaled_urls &&
      data.imageData.upscaled_urls.length > 0
    ) {
      console.log('the images are ready!');
      setUpscaledImages(data.imageData.upscaled_urls);
      // setImagesReadyUrl(data.data.upscaled_urls[0]);
      const intervalllID = intervalID || intervalId;
      return clearInterval(intervalID);
    }
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

  const addCharacterToDB = async () => {
    setLoadingAddCharacter(true);
    const architecturedCharacter = {
      name: thisCharacter.name,
      traits: {
        'Ancestral Lineage': thisCharacter['Ancestral Lineage'],
        'Astral Connection': thisCharacter['Astral Connection'],
        'Birth Sign': thisCharacter['Birth Sign'],
        'Cherished Memory': thisCharacter['Cherished Memory'],
        'Dream Manifestation': thisCharacter['Dream Manifestation'],
        'Dream Vision': thisCharacter['Dream Vision'],
        'Elemental Affinity': thisCharacter['Elemental Affinity'],
        'Guiding Totem': thisCharacter['Guiding Totem'],
        'Hidden Talent': thisCharacter['Hidden Talent'],
        'Karmic Debt': thisCharacter['Karmic Debt'],
        'Magical Ability': thisCharacter['Magical Ability'],
        'Past Life Occupation': thisCharacter['Past Life Occupation'],
        'Sacred Item': thisCharacter['Sacred Item'],
        "Soul's Age": thisCharacter["Soul's Age"],
        'Spirit Animal': thisCharacter['Spirit Animal'],
        'Spiritual Lesson': thisCharacter['Spiritual Lesson'],
        type: thisCharacter.characterType,
        city: thisCharacter.city.cityName,
        predominantChakra: thisCharacter.predominantChakra,
      },
      upscaledImageUrls: upscaledImages,
      chosenImageUrl: chosenImageUrl,
      promptForMidjourney:
        "https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. Elysia is a slender, tall figure with long brown hair that twists into curls at the end. Her skin glows with a soft light, and her eyes are a deep purple that changes hue depending on her emotions. She wears a flowing green dress adorned with intricate patterns. A golden necklace with a small locket carrying a faded picture of a loved one hangs around her neck. Elysia's constant companion, the Chameleon, rests on her shoulder, blending into its surroundings and keeping a watchful eye over its keeper.",
    };
    const response = await fetch('/api/character', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        character: architecturedCharacter,
      }),
    });
    const data = await response.json();
    setLoadingAddCharacter(false);
    if (data.message) setCharacterAdded(true);
  };

  return (
    <div className='text-center flex h-screen w-full'>
      <div className='p-4 bg-theblue h-full w-64'>
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
        {chosenWorld && (
          <p className='text-thewhite '>{chosenWorld.description}</p>
        )}
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
        <div>
          {chosenWorld && characterType && (
            <div>
              <button
                className='mt-4 bg-thegreen border-theblack p-2 rounded-xl'
                onClick={getNewCharacter}
              >
                Get New Character
              </button>
              <br />
              <button
                className='mt-4 bg-thegreen border-theblack p-2 rounded-xl'
                onClick={() => console.log(thisCharacter)}
              >
                Log Character
              </button>
            </div>
          )}

          <br />
          {systemMessage && userMessage && (
            <button
              className='px-2 py-1 bg-thepurple text-thewhite mt-2 rounded-xl hover:opacity-50 border-thewhite'
              onClick={askChatGTPforCharacterInformation}
            >
              <>
                {' '}
                {loadingAnkyResponse
                  ? 'Anky is thinking...'
                  : 'Ask Anky For Story'}
              </>
            </button>
          )}
          {promptForMidjourney && (
            <button
              className='px-2 mt-2 py-1 bg-theblack text-thewhite border rounded-xl hover:text-thegreen border-thewhite'
              onClick={promptMidjourneyForImages}
            >
              {midjourneyLoading
                ? 'Loading imagine api response...'
                : 'PROMPT IMAGINE API'}
            </button>
          )}
        </div>
      </div>
      <div className='text-thewhite p-4 overflow-y-scroll'>
        {chosenWorld && (
          <div className='w-full h-full flex'>
            <div className='w-96 '>
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
            </div>
            <div>
              {ankyResponded && (
                <div className='w-9/12 p-4 bg-thelightblue rounded-2xl mx-auto my-4'>
                  <h2 className='mb-4 text-2xl'>{thisCharacter.name}</h2>
                  {thisCharacter.characterStory.split('\n').map((x, i) => {
                    return <p className='text-theblack mb-2'>{x}</p>;
                  })}

                  {imagineId && (
                    <div>
                      {imageProgress && (
                        <p>The image is {imageProgress}% ready.</p>
                      )}
                      <div className='flex flex-row flex-wrap'>
                        {upscaledImages.map((image, index) => {
                          return (
                            <div
                              onClick={() => setChosenImageUrl(image)}
                              className={`w-1/2 p-2 border ${
                                chosenImageUrl === image
                                  ? 'border-thegreenbtn'
                                  : 'border-thewhite'
                              }  aspect-square relative`}
                            >
                              <Image
                                fill
                                src={image}
                                alt={`Image number ${index + 1}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                      {!characterAdded && chosenImageUrl && (
                        <button
                          onClick={addCharacterToDB}
                          className='p-2 bg-thedarkred text-thewhite mt-4 rounded-xl border border-white'
                        >
                          {!loadingAddCharacter
                            ? 'Adding Character to DB'
                            : 'Loading...'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsForGettingImage;
