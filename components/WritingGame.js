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
import { useRouter } from 'next/router';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const dancingScript = Dancing_Script({ weight: '400', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

const WritingGame = ({
  userPrompt,
  setLifeBarLength,
  setLives,
  lives,
  ankyverseDate,
}) => {
  const audioRef = useRef();
  const address = useAddress();
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [runSubmitted, setRunSubmitted] = useState(false);
  const [upscaledUrls, setUpscaledUrls] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [chosenImageIndex, setChosenImageIndex] = useState(0);
  const [savingRound, setSavingRound] = useState(false);
  const [moreThanMinRun, setMoreThanMinRound] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [ankyRevealed, setAnkyRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [character, setCharacter] = useState(null);
  const [ankyIsReady, setAnkyIsReady] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [ankyThinking, setAnkyThinking] = useState(true);
  const [ankyResponse, setAnkyResponse] = useState('');
  const [gettingAnkyverseCharacter, setGettingAnkyverseCharacter] =
    useState(false);
  const [savedToDb, setSavedToDb] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');
  const [secondLoading, setSecondLoading] = useState(false);
  const [thirdLoading, setThirdLoading] = useState(false);
  const [copyText, setCopyText] = useState('Copy my writing');

  const [progress, setProgress] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const textareaRef = useRef(null);
  const intervalRef = useRef(null);
  const keystrokeIntervalRef = useRef(null);

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

        if (elapsedTime > 3000 && !isDone) {
          // change 1000 to 3000 for 3 seconds
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
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    alert('Your writing is in your clipboard. Paste it somewhere to keep it.');
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

  const pasteText = async () => {
    await navigator.clipboard.writeText(text);
    alert('Your writing is in your clipboard');
  };

  const getAnkyverseCharacter = async () => {
    setGettingAnkyverseCharacter(true);
    setTimeout(() => {
      setSecondLoading(true);
    }, 2222);
    setTimeout(() => {
      setThirdLoading(true);
    }, 5555);
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

    setCharacter({
      name: jsonResponse.character.characterName,
      story: jsonResponse.character.characterBackstory,
    });
    setAnkyResponse('aloja');
    setAnkyThinking(false);
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
        console.log('the data jsHEREon is :', dataJson.status);
        if (!dataJson) return;
        if (dataJson && dataJson.status === 'in-progress') {
          console.log('IN PROGRESS:', dataJson.progress);
          setProgress(dataJson.progress);
        }
        if (dataJson && dataJson.status === 'completed') {
          setProgress(null);
          setAnkyIsReady(true);
          clearInterval(fetchingImage);
          setUpscaledUrls(dataJson.upscaled_urls);
        }
      }, 4444);
    }
  };

  return (
    <div
      className='text-thewhite relative  flex flex-col items-center py-8 justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 120px)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <audio ref={audioRef}>
        <source src='/sounds/bell.mp3' />
      </audio>
      {gettingAnkyverseCharacter ? (
        <div className='h-full overflow-y-scroll'>
          {ankyThinking ? (
            <div className='py-0 flex flex-col mt-8 space-x-2 items-center h-full'>
              <div className='rounded-full glowing mb-4 overflow-hidden shadow-lg border-4 border-thewhite'>
                <Image
                  src='/images/anky.png'
                  width={333}
                  height={333}
                  className=''
                  alt='Anky'
                />
              </div>

              {ankyResponse === '' ? (
                <div className='flex flex-col justify-center items-center'>
                  <p className='mt-2 md:w-2/5 '>
                    I&apos;m looking in the ether for a representation of you
                    inside the Ankyverse...
                  </p>
                  {secondLoading && (
                    <p className='mt-2 md:w-2/5 fade-in'>
                      In the meantime, just relax and sync your breath with the
                      white glow. It will help you tap deeper with yourself.
                    </p>
                  )}
                  {thirdLoading && (
                    <p className='mt-2 md:w-2/5 fade-in'>
                      That is what this place is all about, anyway.
                    </p>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className=' text-center  w-2/5 mx-auto'>
              {character && (
                <div className='flex flex-col w-full justify-center items-center'>
                  <h2 className='text-4xl mb-4'>{character.name}</h2>
                  <div className='overflow-y-scroll'>
                    {character.story.split('\n').map((x, i) => (
                      <p key={i}>{x}</p>
                    ))}
                  </div>
                  {ankyRevealed && (
                    <div>
                      <div className='relative w-96 mx-auto h-96 border-2 mb-2 border-thewhite rounded-2xl overflow-hidden'>
                        <Image
                          fill
                          src={upscaledUrls[chosenImageIndex]}
                          alt='Your anky'
                        />
                      </div>
                      <p className='mb-2'>
                        If you are still here, you see the potential.
                      </p>
                      <p className='mb-2'>
                        This character will just be the mirror.
                      </p>
                      <p className='mb-2'>
                        That will show you your truth, each day that you come...
                      </p>
                      <p className='mb-2'>
                        To pour your soul into this writing, exploring who you
                        are.
                      </p>
                      <p className='mb-2'>Thank you for your time.</p>
                      <p className='mb-2'>I honor it deeply.</p>
                      <p className='mb-2'>jp</p>
                      <div className='flex justify-center'>
                        <Button
                          buttonAction={() =>
                            alert('This is just the beginning.')
                          }
                          buttonText={`Mint ${character.name} as an NFT`}
                          buttonColor='bg-thegreenbtn hover:opacity-70'
                        />
                      </div>
                      <small className='mb-2'>
                        If, for some reason, the image didn&apos;t load, you can
                        copy the URL here and check it out. Let me know and
                        I&apos;ll fix it asap.
                      </small>
                      <small>{upscaledUrls[chosenImageIndex]}</small>
                    </div>
                  )}

                  {!ankyRevealed && (
                    <div className='p-4 bg-thegreen rounded-xl text-center border-thewhite border-2 mb-8'>
                      {
                        <div>
                          <p>
                            {character.name}&apos;s image is being generated...
                          </p>
                          {progress > 0 && (
                            <div>
                              <p className='text-2xl'>{progress}%</p>
                              <div>
                                <small>What number do you prefer?</small>
                                <div className='flex flex-wrap space-x-2'>
                                  {[0, 1, 2, 3].map((x, i) => (
                                    <small
                                      className={`text-thewhite ${
                                        chosenImageIndex === x
                                          ? 'text-lg'
                                          : 'text-md'
                                      }`}
                                      onClick={() => setChosenImageIndex(x)}
                                    >
                                      {x}
                                    </small>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      }
                      {ankyIsReady && (
                        <div className='flex justify-center'>
                          <Button
                            buttonAction={() => setAnkyRevealed(true)}
                            buttonText={`Reveal ${character.name}`}
                            buttonColor='bg-thegreenbtn hover:opacity-70'
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='w-full px-2 mt-4 md:mt-4 md:w-1/2 lg:w-2/3'>
          <>
            {!finished && (
              <div
                className={`${time > 0 && 'fade-out'}} ${time > 1 && 'hidden'}`}
              >
                <small className={`${righteous.className}  font-bold`}>
                  {ankyverseDate}
                </small>
                <p
                  className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
                >
                  {userPrompt}
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  Feel the inquiry. Read it with intention. Answer with your
                  heart.
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  Write whatever comes up. Your truth, without judgements.
                </p>
                <p className={`${righteous.className} mb-2 font-bold`}>
                  Life is always watching.
                </p>
                <p className={`${righteous.className} mb-2 font-bold`}>
                  Min score to qualify is 30 seconds.
                </p>
              </div>
            )}

            <textarea
              ref={textareaRef}
              disabled={finished}
              style={{
                top: `${time >= 10 && '0'}%`,
                bottom: `${time >= 10 && '0'}%`,
                left: `${time >= 10 && '0'}%`,
                right: `${time >= 10 && '0'}%`,
                transition: 'top 1s, bottom 1s, left 1s, right 1s', // smooth transition over 1 second
              }}
              className={`${pacifico.className} ${time >= 10 && 'absolute'} ${
                time < 10 && 'md:w-3/5 md:aspect-video w-full h-square'
              } p-4 text-thewhite text-2xl border border-gray-300 rounded-md  bg-opacity-50 bg-theblack`}
              value={text}
              placeholder='write here...'
              onChange={handleTextChange}
            ></textarea>
            {time >= 1 && (
              <div
                className={`${
                  time >= 10 && 'fade-in'
                } flex flex-col justify-center items-center text-opacity-20 mb-4`}
              >
                <div className={`${time >= 10 ? 'text-9xl' : 'text-2xl'}`}>
                  {time}
                </div>

                {finished ? (
                  <div className='flex flex-col md:flex-row space-x-2'>
                    <Button
                      buttonColor='bg-thegreenbtn'
                      buttonAction={pasteText}
                      buttonText='Copy writing to clipboard'
                    />

                    {time > 30 ? (
                      <Button
                        buttonAction={getAnkyverseCharacter}
                        buttonText='Get character for the Ankyverse'
                      />
                    ) : (
                      <Button
                        buttonAction={startNewRun}
                        buttonText='Try again (30s min)'
                      />
                    )}
                  </div>
                ) : (
                  <p className={`${righteous.className}  font-bold`}>
                    {userPrompt}
                  </p>
                )}
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default WritingGame;
