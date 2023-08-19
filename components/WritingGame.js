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
import {
  ConnectWallet,
  useSigner,
  Web3Button,
  useAddress,
  MediaRenderer,
} from '@thirdweb-dev/react';

import { ethers, BigNumber } from 'ethers';

import { toast } from 'react-toastify';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';

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
  const signer = useSigner();

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
  const [character, setCharacter] = useState(null);
  const [ankyIsReady, setAnkyIsReady] = useState(false);
  const [ankyReflection, setAnkyReflection] = useState(null);
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

  let sdk;
  if (signer) {
    sdk = ThirdwebSDK.fromSigner(signer);
  }

  useEffect(() => {
    const loadSmartContract = async () => {
      if (signer) {
        console.log('insidere');
        sdk = ThirdwebSDK.fromSigner(signer);
      }
      if (sdk) {
        const contractResponse = await sdk.getContract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        );
        if (contractResponse) {
          setContract(contractResponse);
        }
      }
      setLoadingPage(false);
    };
    loadSmartContract();
  }, [signer]);

  useEffect(() => {
    const checkIfMinted = async () => {
      try {
        if (contract && address) {
          const data = await contract.call('tokenOfOwnerByIndex', [address, 0]);
          const tokenOfAddress = BigNumber.from(data._hex).toString();
          setAlreadyMinted(true);
          setTokenId(tokenOfAddress);
        }
      } catch (error) {
        console.log('the error is: ', error);
      }
      setLoading(false);
    };
    checkIfMinted();
  }, [address, contract]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoadingMetadata(true);
        const data = await fetch(
          `https://ipfs.thirdwebstorage.com/ipfs/${process.env.NEXT_PUBLIC_METADATA_IPFS_CID}/${tokenId}`
        );
        const jsonResponse = await data.json();
        setMetadata(jsonResponse);
      } catch (error) {
        console.log('There was an error fetching the metadata');
      }
      setLoadingMetadata(false);
    };
    if (tokenId) {
      fetchMetadata();
    } else {
      setLoadingMetadata(false);
    }
  }, [tokenId]);

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

  if (loadingMetadata || loading)
    return <p className='text-thewhite'>Loading </p>;

  if (errorProblem)
    return (
      <div
        className={`${righteous.className} text-thewhite relative  flex flex-col items-center  justify-center w-full bg-cover bg-center`}
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
      className={`${righteous.className} text-thewhite relative  flex flex-col items-center justify-center w-full bg-cover bg-center`}
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
      {metadata && (
        <div className='absolute flex flex-col items-center right-2 top-0 w-32 h-32 '>
          <MediaRenderer src={metadata.image} />
          <p>gm</p>
        </div>
      )}
      {finished && time > 30 ? (
        <div className='h-full w-full '>
          {ankyReflection ? (
            <div className='w-full h-full py-4 overflow-y-scroll'>
              <div className='w-2/5 mx-auto '>
                {ankyReflection.split('\n').map((x, i) => (
                  <p key={i}>{x}</p>
                ))}
              </div>

              <div className='rounded-xl w-full mx-auto p-4'>
                {!generatedImages && (
                  <div>
                    {' '}
                    <p className='bg-theorange p-4 rounded-xl w-fit mx-auto'>
                      Your images of today are loading...
                    </p>{' '}
                    {progress && <p>{progress}%</p>}
                  </div>
                )}
                {generatedImages && (
                  <div className='w-full flex flex-col '>
                    <div className='w-full flex justify-around flex-wrap h-fit py-8'>
                      {generatedImages.map((x, i) => (
                        <div
                          key={i}
                          onClick={() => setChosenUpscaledImage(x)}
                          className={`relative aspect-square hover:cursor-pointer w-1/5 ${
                            chosenUpscaledImage === x &&
                            'border-thewhite border-2'
                          } overflow-hidden`}
                        >
                          <Image
                            src={x}
                            fill
                            alt={`Upscaled image number ${i}`}
                          />
                        </div>
                      ))}
                    </div>
                    {chosenUpscaledImage ? (
                      <div className='w-fit mx-auto'>
                        <Button
                          buttonAction={mintChosenImage}
                          buttonText='Mint'
                          buttonColor='bg-thegreenbtn'
                        />
                      </div>
                    ) : (
                      <p>Choose the image you want to mint</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='flex flex-col h-full justify-center items-center'>
              {loadingAnkyResponse ? (
                <div>
                  <p>
                    Right now this feature is not working, but I&apos;m getting
                    there.
                  </p>
                </div>
              ) : (
                <div>
                  <p>You are done.</p>
                  {writingSaved ? (
                    <p>Thank you. This place gets more fun with your help.</p>
                  ) : (
                    <div className='flex flex-col space-y-1 mx-auto w-96'>
                      <p>
                        It would be of immense value of you save your writing so
                        that I can use it to explore how to design this dPwapp.
                      </p>
                      <p>
                        You can click this button for this to be saved anon.
                      </p>
                      <div className='w-fit mx-auto'>
                        <Button
                          buttonAction={saveWritingAnon}
                          buttonText={
                            writingSavingLoading ? 'Saving...' : 'Save Writing'
                          }
                          buttonColor='bg-thegreenbtn'
                        />
                      </div>
                    </div>
                  )}

                  {metadata ? (
                    <div className='mt-2'>
                      <p>Do you want to get feedback from your Anky?</p>
                    </div>
                  ) : (
                    <div className='mt-2 w-96'>
                      <p>
                        If you had an Anky Genesis NFT on your connected wallet,
                        you would get feedback on what you wrote.
                      </p>
                      <p className='mb-2'>Buy one here:</p>
                      <a
                        href='https://mint.anky.lat'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        https://mint.anky.lat
                      </a>
                    </div>
                  )}
                  <div className='flex space-x-2 justify-center'>
                    <Button
                      buttonColor='bg-theorange'
                      buttonAction={pasteText}
                      buttonText={copyText}
                    />
                    {metadata && (
                      <Button
                        buttonColor='bg-thegreenbtn'
                        buttonAction={processWriting}
                        buttonText='Get Feedback'
                      />
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
                <small className={`${righteous.className}  font-bold`}>
                  {ankyverseDate}
                </small>
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

                <p className={`${righteous.className} mb-2 font-bold`}>
                  If you stop writing for 3 seconds, you lose.
                </p>
                <small className={`${righteous.className} mb-2 font-bold`}>
                  (This won&apos;t be stored anywhere)
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
                  <div>
                    {time <= 30 && (
                      <div>
                        <p className={`${righteous.className} mb-2 font-bold`}>
                          You lost. Remember that you have to keep writing, no
                          matter what.
                        </p>
                        <p className={`${righteous.className} mb-2 font-bold`}>
                          This game is designed to bring you into a meditative
                          state, so just relax and let your being come forth
                          through your words.
                        </p>
                      </div>
                    )}
                    <div className='flex flex-col md:flex-row justify-center space-x-2'>
                      <Button
                        buttonColor='bg-thegreenbtn'
                        buttonAction={pasteText}
                        buttonText={copyText}
                      />

                      {time > 30 ? (
                        <Button
                          buttonAction={getAnkyverseCharacter}
                          buttonText='I want my Anky'
                        />
                      ) : (
                        <Button
                          buttonAction={startNewRun}
                          buttonText='Start again'
                        />
                      )}
                    </div>
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
