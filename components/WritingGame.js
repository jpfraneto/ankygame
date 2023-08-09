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
import WalletCreationComponent from './WalletCreationComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  const [recoveryPhrase, setRecoveryPhrase] = useState(true);
  const [recoveryPhraseWords, setRecoveryPhraseWords] = useState([
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
    'loading',
  ]);
  const [characterIsReady, setCharacterIsReady] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(false);
  const [ankyRevealed, setAnkyRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [character, setCharacter] = useState(null);
  const [ankyIsReady, setAnkyIsReady] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [ankyThinking, setAnkyThinking] = useState(true);
  const [ankyResponse, setAnkyResponse] = useState('');
  const [walletWasCreated, setWalletWasCreated] = useState(false);
  const [ankyThinkingOver, setAnkyThinkingOver] = useState(false);
  const [gettingAnkyverseCharacter, setGettingAnkyverseCharacter] =
    useState(false);
  const [savedToDb, setSavedToDb] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [errorProblem, setErrorProblem] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');
  const [secondLoading, setSecondLoading] = useState(false);
  const [thirdLoading, setThirdLoading] = useState(false);
  const [copyText, setCopyText] = useState('Copiar lo que escribí');

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
    alert('Lo que escribiste está en el portapapeles. Pégalo donde quiras.');
  };

  const startNewRun = () => {
    audioRef.current.pause();
    setCopyText('Copiar lo que escribí');
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
    setCopyText('Copiado.');
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
          console.log('the data jsHEREon is :', dataJson.status);
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

  if (errorProblem)
    return (
      <div
        className='text-thewhite relative  flex flex-col items-center  justify-center w-full bg-cover bg-center'
        style={{
          boxSizing: 'border-box',
          height: 'calc(100vh  - 90px)',
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
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
      className='text-thewhite relative  flex flex-col items-center  justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 90px)',
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
        <div className='h-full w-full overflow-y-scroll'>
          {!walletWasCreated ? (
            <div className='py-0 flex flex-col mt-8 space-x-2 items-center h-full'>
              <WalletCreationComponent
                words={recoveryPhraseWords}
                setWalletWasCreated={setWalletWasCreated}
              />
            </div>
          ) : (
            <div className='pt-8 text-center h-full px-4 md:w-2/5 mx-auto'>
              {characterIsReady ? (
                <div className='flex flex-col w-full justify-center items-center'>
                  <h2 className='text-4xl mb-4'>{character.name}</h2>
                  <div className='overflow-y-scroll fade-in'>
                    {character.story &&
                      character.story
                        .split('\n')
                        .map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                  </div>
                  {ankyRevealed && (
                    <div className='h-full pb-8'>
                      <div className='relative w-96 mx-auto h-96 border-2 mb-2 border-thewhite rounded-2xl overflow-hidden'>
                        <Image
                          fill
                          src={upscaledUrls[chosenImageIndex]}
                          alt='Your anky'
                        />
                      </div>
                      <p className='mb-2'>
                        If you are still here, you understand the potential.
                      </p>
                      <p className='mb-2'>
                        Este personaje simplemente va a ser un espejo.
                      </p>
                      <p className='mb-2'>
                        Que te va a mostrar tu verdad, cada día que vengas.
                      </p>
                      <p className='mb-2'>
                        Para escribir con el alma, explorando quien eres.
                      </p>
                      <p className='mb-2'>Gracias por tu tiempo.</p>
                      <p className='mb-2'>Lo honro profundamente.</p>
                      <p className='mb-2'>jp</p>
                      <div className='flex justify-center flex-col items-center'>
                        <Button
                          buttonAction={() =>
                            alert('Este es sólo el comienzo.')
                          }
                          buttonText={`Guardar a ${character.name} para siempre`}
                          buttonColor='bg-thegreenbtn hover:opacity-70 mb-4'
                        />
                      </div>
                    </div>
                  )}

                  {!ankyRevealed && (
                    <div
                      className={`p-4 bg-thegreen rounded-xl text-center border-thewhite border-2 mb-8`}
                    >
                      {
                        <div>
                          {!ankyIsReady && (
                            <p>
                              La imagen de {character.name} está siendo
                              generada...
                            </p>
                          )}
                          <p>Qué número prefieres?</p>
                          <div className='flex flex-wrap justify-center space-x-2'>
                            {[0, 1, 2, 3].map((x, i) => (
                              <p
                                key={i}
                                className={`text-thewhite hover:cursor-pointer border flex justify-center items-center border-thewhite rounded-xl w-8 h-8 hover:opacity-70 ${
                                  chosenImageIndex === x
                                    ? 'text-xl bg-thegreenbtn'
                                    : 'text-md bg-theorange'
                                }`}
                                onClick={() => setChosenImageIndex(x)}
                              >
                                {x}
                              </p>
                            ))}
                          </div>
                          {progress > 0 && (
                            <div>
                              <p className='text-2xl'>{progress}%</p>
                            </div>
                          )}
                        </div>
                      }
                      {ankyIsReady && (
                        <div className='flex justify-center'>
                          <Button
                            buttonAction={() => setAnkyRevealed(true)}
                            buttonText={`Conocer a ${character.name}`}
                            buttonColor='bg-thegreenbtn hover:opacity-70'
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className='flex flex-col items-center '>
                  <div className='rounded-full w-fit mx-auto glowing mb-4 overflow-hidden shadow-lg border-4 border-thewhite'>
                    <Image
                      src='/images/anky.png'
                      width={333}
                      height={333}
                      className=''
                      alt='Anky'
                    />
                  </div>
                  <div className='flex flex-col w-3/5 justify-center items-center'>
                    {true && (
                      <p className='mt-2 fade-in'>
                        Estoy buscando en el éter una representación tuya en el
                        Ankyverso.
                      </p>
                    )}
                    {secondLoading && (
                      <p className='mt-2 fade-in'>
                        Por mientras, relájate y sincroniza tu respiración con
                        el brillo blanco. Concéntrate y siente lo que estás
                        sintiendo.
                      </p>
                    )}
                    {thirdLoading && (
                      <p className='mt-2 fade-in'>
                        De eso se trata este lugar.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='w-full px-2 mt-4 md:w-1/2 lg:w-2/3'>
          <>
            {!finished && (
              <div
                className={` ${text.length > 0 && 'fade-out'} mb-4 ${
                  time > 2 && 'hidden'
                }`}
              >
                {/* <small className={`${righteous.className}  font-bold`}>
                  {ankyverseDate}
                </small> */}
                <p
                  className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
                >
                  {userPrompt}
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  Feel the prompt. Read it with intention. Answer with the
                  heart.
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  Write what comes. Your truth, without judgements.
                </p>
                {/* <p className={`${righteous.className} mb-2 font-bold`}>
                  Life is always watching.
                </p> */}
                <p className={`${righteous.className} mb-2 font-bold`}>
                  The minimum time is 30 seconds
                </p>
                <small className=''>This won&apos;t be stored anywhere.</small>
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
                text ? 'md:aspect-video w-full h-full' : 'w-3/5 h-64'
              } p-4 text-thewhite text-2xl border border-gray-300 rounded-md  bg-opacity-50 bg-theblack`}
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
                <div className={`${text ? 'text-9xl' : 'text-2xl'}`}>
                  {time}
                </div>

                {finished ? (
                  <div className='flex flex-col md:flex-row space-x-2'>
                    <Button
                      buttonColor='bg-thegreenbtn'
                      buttonAction={pasteText}
                      buttonText={copyText}
                    />

                    {time > 1 ? (
                      <Button
                        buttonAction={getAnkyverseCharacter}
                        buttonText='Quiero mi Anky'
                      />
                    ) : (
                      <Button
                        buttonAction={startNewRun}
                        buttonText='Intentar de nuevo (mínimo 30s)'
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
