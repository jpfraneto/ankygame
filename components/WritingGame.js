import React, { useState, useRef, useEffect } from 'react';
import StepsForGettingImage from '@component/components/StepsForGettingImage';
import {
  Inter,
  Righteous,
  Rajdhani,
  Dancing_Script,
  Pacifico,
} from 'next/font/google';
import Button from './Button';
import Image from 'next/image';
import LoggedInUser from './LoggedInUser';
import { useRouter } from 'next/router';

import { usePrivy } from '@privy-io/react-auth';

import { ethers, BigNumber } from 'ethers';

import { toast } from 'react-toastify';

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const dancingScript = Dancing_Script({ weight: '400', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

const WritingGame = ({
  userPrompt,
  setLifeBarLength,
  setLives,
  lives,
  setLoadButtons,
  ankyverseDate,
}) => {
  const { login, authenticated, user } = usePrivy();
  const audioRef = useRef();

  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [runSubmitted, setRunSubmitted] = useState(false);
  const [upscaledUrls, setUpscaledUrls] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [chosenImageIndex, setChosenImageIndex] = useState(0);
  const [savingRound, setSavingRound] = useState(false);
  const [moreThanMinRun, setMoreThanMinRound] = useState(null);
  const [recoveryPhrase, setRecoveryPhrase] = useState(true);
  const [chosenUpscaledImage, setChosenUpscaledImage] = useState('');
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [contract, setContract] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const [generatedImages, setGeneratedImages] = useState('');
  const [loadingAnkyResponse, setLoadingAnkyResponse] = useState(false);

  const [characterIsReady, setCharacterIsReady] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(false);
  const [ankyRevealed, setAnkyRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const [character, setCharacter] = useState(null);
  const [ankyIsReady, setAnkyIsReady] = useState(false);
  const [ankyReflection, setAnkyReflection] = useState(null);
  const [ankyThinking, setAnkyThinking] = useState(true);
  const [ankyResponse, setAnkyResponse] = useState('');
  const [walletWasCreated, setWalletWasCreated] = useState(false);
  const [ankyThinkingOver, setAnkyThinkingOver] = useState(false);
  const [gettingAnkyverseCharacter, setGettingAnkyverseCharacter] =
    useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [savedToDb, setSavedToDb] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [errorProblem, setErrorProblem] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');
  const [secondLoading, setSecondLoading] = useState(false);
  const [thirdLoading, setThirdLoading] = useState(false);
  const [copyText, setCopyText] = useState('Copy my writing');
  const [metadata, setMetadata] = useState(null);
  const [writingSaved, setWritingSaved] = useState(false);
  const [writingSavingLoading, setWritingSavingLoading] = useState(false);

  const [progress, setProgress] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const textareaRef = useRef(null);
  const intervalRef = useRef(null);
  const keystrokeIntervalRef = useRef(null);
  const audioFilesRef = useRef([]);

  useEffect(() => {
    if (musicOn) {
      // If audioFilesRef is empty, initialize the audio files.
      if (audioFilesRef.current.length === 0) {
        for (let i = 1; i <= 5; i++) {
          const audio = new Audio(`/assets/inlakesh/${i}.mp3`);
          audioFilesRef.current.push(audio);
          if (i < 5) {
            audio.addEventListener('ended', function () {
              audioFilesRef.current[i].play();
            });
          }
        }
      }

      // Play the first audio.
      audioFilesRef.current[0].play();
    } else {
      // Pause all audios
      audioFilesRef.current.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
          // You might also want to reset the playback position if desired
          // audio.currentTime = 0;
        }
      });
    }
  }, [musicOn]);

  useEffect(() => {
    if (isActive && !isDone) {
      intervalRef.current = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isActive && !isDone) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, time, isDone]);

  useEffect(() => {
    if (isActive) {
      keystrokeIntervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - lastKeystroke;
        if (time === 480) {
          audioRef.current.play();
        }
        if (elapsedTime > 3000 && !isDone) {
          finishRun();
        } else {
          // calculate life bar length
          const newLifeBarLength = 100 - elapsedTime / 30; // 100% - (elapsed time in seconds * (100 / 3))
          setLifeBarLength(Math.max(newLifeBarLength, 0)); // do not allow negative values
        }
      }, 100);
    } else {
      clearInterval(keystrokeIntervalRef.current);
    }

    return () => clearInterval(keystrokeIntervalRef.current);
  }, [isActive, lastKeystroke]);

  const finishRun = async () => {
    setLifeBarLength(0);
    audioRef.current.volume = 0.1;
    audioRef.current.play();
    setFinished(true);
    setEndTime(Date.now());
    setIsDone(true);
    setIsActive(false);
    clearInterval(intervalRef.current);
    clearInterval(keystrokeIntervalRef.current);
    await navigator.clipboard.writeText(text);
    setMoreThanMinRound(true);
    setFailureMessage(`You're done! This run lasted ${time}.}`);
    if (time > 30) {
      setLoadButtons(true);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    alert('Your writing is on the clipboard');
  };

  const saveWritingAnon = async () => {
    setWritingSavingLoading(true);
    try {
      const response = await fetch('/api/writings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeSpent: time,
          content: text,
        }),
      });
      const data = await response.json();
      setWritingSavingLoading(false);
      setWritingSaved(true);
      console.log('After saving the writing, the data is: ', data);
    } catch (error) {
      console.log('There was an error adding the writing');
    }
  };

  const startNewRun = () => {
    audioRef.current.pause();
    setCopyText('Copy my writing');
    setTime(0);
    setLifeBarLength(100);
    setText('');
    setSavingRound(false);
    setSavedToDb(false);
    setIsDone(false);
    setFinished(false);
  };

  const handleTextChange = event => {
    setText(event.target.value);
    if (!isActive && event.target.value.length > 0) {
      setIsActive(true);
      setFailureMessage('');
      setStartTime(Date.now());
    }
    setLastKeystroke(Date.now());
  };

  const activateUserAccount = async () => {
    const response = await login();
  };

  const pasteText = async () => {
    await navigator.clipboard.writeText(text);
    setCopyText('Copied.');
  };

  async function fetchCharacterFromOpenAi() {
    console.log('before fetching the character');
    try {
      const response = await fetch('/api/newanky', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeSpent: time,
          wordCount: text.split(' ').length,
          content: text,
        }),
      });
      const jsonResponse = await response.json();
      console.log('after fetching the character');
      setCharacter({
        name: jsonResponse.character.characterName,
        story: jsonResponse.character.characterBackstory,
      });
      setCharacterIsReady(true);
      if (jsonResponse.character.imagineApiId) {
        const fetchingImage = setInterval(async () => {
          const data = await fetch('/api/fetchImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageId: jsonResponse.character.imagineApiId,
            }),
          });
          const dataJson = await data.json();
          if (!dataJson) return;
          if (dataJson && dataJson.status === 'in-progress') {
            setProgress(dataJson.progress);
          }
          if (dataJson && dataJson.status === 'completed') {
            setProgress(null);
            setAnkyIsReady(true);
            clearInterval(fetchingImage);
            setLoadButtons(true);
            const upscaledUrlsLinks = dataJson.upscaled.map(
              upscaledId => `https://88minutes.xyz/assets/${upscaledId}.png`
            );
            setUpscaledUrls(upscaledUrlsLinks);
          }
        }, 4444);
      }
    } catch (error) {
      setCopyText('Copiar lo que escribí');
      setErrorProblem(true);
      console.log('the error was', error);
    }
  }

  const getAnkyverseCharacter = async () => {
    setGettingAnkyverseCharacter(true);
    fetchCharacterFromOpenAi();
    setTimeout(() => {
      setSecondLoading(true);
    }, 2222);
    setTimeout(() => {
      setThirdLoading(true);
    }, 5555);
    const getWords = await fetch('/api/wallet');
    const words = await getWords.json();
    setRecoveryPhraseWords(words);
  };

  const processWriting = async () => {
    setLoadingAnkyResponse(true);
    let ankyBio, ankyName;
    if (metadata) {
      console.log('the metadata is: ', metadata);
      ankyBio = metadata.description;
      ankyName = metadata.name;
    } else {
      return alert('You need an Anky to go through this process');
    }
    const data = await fetch('/api/ankysoul', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ankyBio,
        writing: text,
        ankyName,
        questionOfToday: userPrompt,
      }),
    });
    const dataJson = await data.json();
    if (dataJson) {
      setLoadingAnkyResponse(false);
      setAnkyReflection(dataJson.mirroring);
      if (dataJson.imagineApiId) {
        const fetchingImage = setInterval(async () => {
          const data = await fetch('/api/fetchImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageId: dataJson.imagineApiId,
            }),
          });
          const imageDataJson = await data.json();
          console.log('AAACA :', imageDataJson.status);
          if (!imageDataJson) return;
          if (imageDataJson && imageDataJson.status === 'in-progress') {
            setProgress(imageDataJson.progress);
          }
          if (imageDataJson && imageDataJson.status === 'completed') {
            console.log('inside the completed route');
            console.log(imageDataJson);
            setProgress(null);
            clearInterval(fetchingImage);
            setLoadButtons(true);
            const upscaledUrlsLinks = imageDataJson.upscaled.map(
              upscaledId => `https://88minutes.xyz/assets/${upscaledId}.png`
            );
            setGeneratedImages(upscaledUrlsLinks);
          }
        }, 4444);
      }
    }
    console.log('the dataJson after the writing is: ', dataJson);
  };

  const mintChosenImage = async () => {
    try {
      const data = await fetch('/api/mintToPinata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          upscaledImageUrl: chosenUpscaledImage,
          userWriting: text,
          ankyResponse: ankyReflection,
        }),
      });
      const pinningResponse = await data.json();
      console.log('The pinning response', pinningResponse);
    } catch (error) {
      console.log('There was an error here!');
      console.log(error);
    }
  };

  if (errorProblem)
    return (
      <div
        className={`${righteous.className} text-thewhite relative  flex flex-col items-center justify-center w-full bg-cover bg-center`}
        style={{
          boxSizing: 'border-box',
          height: 'calc(100vh  - 90px)',
          backgroundImage: "url('/images/the-monumental-game.jpeg')",
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <p>
          There was an error. But you can always keep your writing if you want.
        </p>
        <p>I&apos;m sorry. I&apos;m doing my best to make this thing work.</p>
        <Button
          buttonColor='bg-thegreenbtn'
          buttonAction={pasteText}
          buttonText={copyText}
        />
      </div>
    );

  return (
    <div
      className={`${righteous.className} text-theblack relative  flex flex-col items-center  w-full bg-cover bg-center`}
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh - 33px)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {!text.length > 0 && (
        <div
          className={`absolute top-0 text-thewhite text-xl right-0 hover:cursor-pointer pr-2 ${
            !musicOn && 'line-through'
          }`}
          onClick={() => setMusicOn(x => !x)}
        >
          music
        </div>
      )}

      <audio ref={audioRef}>
        <source src='/sounds/bell.mp3' />
      </audio>
      <div className='md:block text-thewhite w-full px-2 md:w-1/2 lg:w-2/3'>
        <div>
          {!finished && (
            <div
              className={` ${text.length > 0 && 'fade-out'} mb-4 ${
                time > 2 && 'hidden'
              }`}
            >
              <small className={`${righteous.className}  font-bold`}>
                {ankyverseDate}
              </small>
              <p
                className={`${righteous.className} text-4xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]   mb-4 font-bold text-center`}
              >
                {userPrompt}
              </p>
              <p className={`${righteous.className} mb-2 font-bold`}>
                Feel the prompt. Read it with intention. Answer with the heart.
              </p>

              <p className={`${righteous.className} mb-2 font-bold`}>
                Write what comes. Your truth, without judgements.
              </p>

              <p className={`${righteous.className} mb-2 font-bold`}>
                If you stop writing for 3 seconds, you lose.
              </p>

              <small
                className={`${righteous.className} hidden text-center md:flex md:justify-center mb-2 font-bold`}
              >
                (This won&apos;t be stored anywhere)
              </small>
              <small
                className={`${righteous.className} md:hidden mb-2 font-bold`}
              >
                (This website is optimized for desktop)
              </small>
            </div>
          )}

          <textarea
            ref={textareaRef}
            disabled={finished}
            style={{
              top: `${text && '0'}%`,
              bottom: `${text && '0'}%`,
              left: `${text && '0'}%`,
              right: `${text && '0'}%`,
              transition: 'top 1s, bottom 1s, left 1s, right 1s', // smooth transition over 1 second
            }}
            className={`${pacifico.className} ${text && 'absolute'} ${
              text ? 'md:aspect-video md:flex w-full h-full' : 'w-3/5 h-64'
            } p-4 text-thewhite ${
              time > 2 && 'opacity-80'
            } placeholder-thewhite  text-2xl border border-black rounded-md  bg-opacity-10 bg-theblack`}
            value={text}
            placeholder='write here...'
            onChange={handleTextChange}
          ></textarea>
          {text && (
            <div
              className={`${
                text && 'fade-in'
              } flex flex-col justify-center items-center text-opacity-20 mb-4`}
            >
              <div
                className={`${
                  text
                    ? 'text-6xl z-50 text-thewhite drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
                    : 'text-2xl'
                }`}
              >
                {time}
              </div>

              {finished ? (
                <>
                  {authenticated ? (
                    <>
                      <LoggedInUser copyWriting={copyToClipboard} />
                    </>
                  ) : (
                    <div>
                      {time <= 3 ? (
                        <div>
                          <p
                            className={`${righteous.className} mb-2 font-bold`}
                          >
                            You lost. You have to keep writing, no matter what.
                          </p>
                          <p
                            className={`${righteous.className} mb-2 font-bold`}
                          >
                            This game is designed to bring you into a meditative
                            state.
                          </p>
                          <p
                            className={`${righteous.className} mb-2 font-bold`}
                          >
                            Just relax and let your being come forth through
                            your words.
                          </p>
                          <p
                            className={`${righteous.className} mb-2 font-bold`}
                          >
                            Min score to qualify is 30 seconds.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p
                            className={`${righteous.className} mb-2 font-bold`}
                          >
                            Great job.
                          </p>
                          <p
                            className={`${righteous.className} mb-2 font-bold`}
                          >
                            You can now login anonymously to store your writings
                            forever.
                          </p>
                        </div>
                      )}
                      <div className='flex flex-col md:flex-row justify-center space-x-2'>
                        <Button
                          buttonColor='bg-thegreenbtn'
                          buttonAction={pasteText}
                          buttonText={copyText}
                        />

                        {time > 3 ? (
                          <Button
                            buttonAction={login}
                            buttonText='Create account / login'
                          />
                        ) : (
                          <Button
                            buttonAction={startNewRun}
                            buttonText='Start again'
                          />
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className={`${righteous.className}  font-bold`}>
                  {userPrompt}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingGame;
