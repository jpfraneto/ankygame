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

const ikigaiQuestions = [
  'What are you good at?',
  'What can you get paid for?',
  'What does the world need?',
  'What do you love?',
];

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const dancingScript = Dancing_Script({ weight: '400', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

const WritingGameIkigai = ({
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
  const [startIkigai, setStartIkigai] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const [generatedImages, setGeneratedImages] = useState('');
  const [ikigaiPromptIndex, setIkigaiPromptIndex] = useState(0);
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
  const [chosenMinutes, setChosenMinutes] = useState(3);
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
        if (time === 120 && ikigaiPromptIndex === 0) {
          setText(x => x + '\n\n');
          audioRef.current.play();
          setIkigaiPromptIndex(1);
        }
        if (time === 240 && ikigaiPromptIndex === 1) {
          setText(x => x + '\n\n');
          audioRef.current.play();
          setIkigaiPromptIndex(2);
        }
        if (time === 360 && ikigaiPromptIndex === 2) {
          setText(x => x + '\n\n');
          audioRef.current.play();
          setIkigaiPromptIndex(3);
        }
        if (time === 480) {
          audioRef.current.play();
          finishRun();
        }
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

  const nextQuestion = () => {
    setIkigaiPromptIndex(x => x + 1);
    setIsActive(false);
    clearInterval(intervalRef.current);
    clearInterval(keystrokeIntervalRef.current);
  };

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
    alert('Your writing is on the clipboard');
  };

  const startNewRun = () => {
    audioRef.current.pause();
    setCopyText('Copy my writing');
    setTime(0);
    setIkigaiPromptIndex(0);
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

  const processWriting = async () => {
    setLoadingAnkyResponse(true);
    let ankyBio, ankyName;
    if (metadata) {
      ankyBio = metadata.description;
      ankyName = metadata.name;
    } else {
      return alert('You need an Anky to go through this process');
    }
    const data = await fetch('/api/ankyikigai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ankyBio,
        writing: text,
        ankyName,
      }),
    });
    const dataJson = await data.json();
    if (dataJson) {
      setAnkyReflection(dataJson.mirroring);
    } else {
      alert("I'm sorry, there was an error.");
    }
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

  if (!metadata)
    return (
      <div className=' mt-20 text-thewhite'>
        <p>This section is only available to Anky Genesis Holders.</p>
        <p>You can mint your Anky here:</p>
        <a
          className='hover:text-emblazion'
          href='https://mint.anky.lat'
          target='_blank'
          rel='noopener noreferrer'
        >
          https://mint.anky.lat
        </a>
      </div>
    );

  return (
    <div
      className={`${righteous.className} text-thewhite relative flex flex-col items-center justify-center w-full bg-cover bg-center`}
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
      {!ankyReflection && (
        <small className={`${righteous.className}  absolute top-0 font-bold`}>
          {ankyverseDate}
        </small>
      )}
      <audio ref={audioRef}>
        <source src='/sounds/bell.mp3' />
      </audio>
      {metadata && (
        <div className='absolute right-2 top-0 w-32 h-32 '>
          <MediaRenderer src={metadata.image} />
        </div>
      )}
      {finished && time > 30 ? (
        <div className='h-full w-full pt-4'>
          {ankyReflection ? (
            <div className='w-full h-full py-4 overflow-y-scroll'>
              <div className='w-2/5 mx-auto '>
                {ankyReflection.split('\n').map((x, i) => (
                  <p key={i}>{x}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className='flex flex-col h-full justify-center items-center'>
              {loadingAnkyResponse ? (
                <div>
                  <p>Loading...</p>
                </div>
              ) : (
                <div>
                  <p>You are done.</p>

                  <div>
                    <p>Do you want to get feedback from your Anky?</p>
                  </div>

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
                        buttonText='Get My Ikigai'
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='w-full px-2 -mt-16 md:w-1/2 lg:w-2/3'>
          <>
            {startIkigai && !finished ? (
              <div className='fade-in'>
                <p
                  className={`${righteous.className} mb-8 fade-in text-6xl font-bold`}
                >
                  {ikigaiQuestions[ikigaiPromptIndex]}
                </p>
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
                  className={`${pacifico.className}  ${text && 'absolute'} ${
                    text ? 'md:aspect-video w-full h-full' : 'w-3/5 h-64'
                  } p-4 text-thewhite text-2xl border border-gray-300 rounded-md  bg-opacity-50 bg-theblack`}
                  value={text}
                  placeholder='write here...'
                  onChange={handleTextChange}
                ></textarea>
                {text.length === 0 && (
                  <div className='mt-4 flex justify-center fade-in'>
                    <Button
                      buttonAction={() => setStartIkigai(false)}
                      buttonText="Go Back, I'm not ready yet"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div
                className={` ${text.length > 0 && 'fade-out'} mb-4  ${
                  time > 2 && 'hidden'
                }`}
              >
                <p
                  className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
                >
                  Ikigai
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  The secret to a joyful life
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  Write what comes. Your truth, without judgements.
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  If you stop writing for 3 seconds, you lose.
                </p>

                <p className={`${righteous.className} mb-2 font-bold`}>
                  There are 4 questions, with 2 minutes to reply each.{' '}
                </p>
                <p className={`${righteous.className} mb-2 font-bold`}>
                  You will be 8 minutes writing non-stop.
                </p>
                <p>{metadata.name} is ready to help you.</p>
                <div className='flex justify-center mt-4'>
                  <Button
                    buttonAction={() => setStartIkigai(true)}
                    buttonText='Start'
                    buttonColor='bg-thegreenbtn'
                  />
                </div>
              </div>
            )}

            {text && (
              <div
                className={`${
                  text && 'fade-in'
                } flex flex-col justify-center items-center text-opacity-20 mb-4`}
              >
                {!finished && (
                  <div className={`${text ? 'text-9xl' : 'text-2xl'}`}>
                    {time}
                  </div>
                )}

                {finished ? (
                  <div>
                    {time <= 30 && (
                      <div>
                        <p className={`${righteous.className} mb-2 font-bold`}>
                          You lost. Remember that you have to keep writing, no
                          matter what.
                        </p>
                        <p className={`${righteous.className} mb-2 font-bold`}>
                          This game is designed to bring your truth forth, so
                          just trust and explore your writing.
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

export default WritingGameIkigai;
