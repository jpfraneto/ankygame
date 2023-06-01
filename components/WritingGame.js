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
import { useRouter } from 'next/router';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const dancingScript = Dancing_Script({ weight: '400', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

const WritingGame = ({ userPrompt }) => {
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [lives, setLives] = useState(3);
  const [showText, setShowText] = useState(false);
  const [submittingRunToDB, setSubmittingRunToDB] = useState(false);
  const [runSubmitted, setRunSubmitted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [savingRound, setSavingRound] = useState(false);
  const [moreThanMinRun, setMoreThanMinRound] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [isHighscore, setIsHighscore] = useState(false);
  const [selectedRun, setSelectedRun] = useState(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [finishedText, setFinishedText] = useState(null);
  const [displayStepsForGettingImage, setDisplayStepsForGettingImage] =
    useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [ankyImageUrl, setAnkyImageUrl] = useState('/images/anky.png');
  const [failureMessage, setFailureMessage] = useState('');
  const [copyText, setCopyText] = useState('Copy my writing');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [displayLeaderboard, setDisplayLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState(null);

  const textareaRef = useRef(null);
  const intervalRef = useRef(null);
  const keystrokeIntervalRef = useRef(null);
  useEffect(() => {
    const loadLeaderboard = async () => {
      fetch('/api/runs')
        .then(res => res.json())
        .then(data => {
          const highscoreValue = data.reduce(
            (max, obj) => (obj.timeSpent > max ? obj.timeSpent : max),
            0
          );
          setHighscore(highscoreValue);
          setLeaderboard(data);
        })
        .catch(err => console.error(err));
    };
    loadLeaderboard();
  }, []);

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
        if (Date.now() - lastKeystroke > 1000 && !isDone) {
          finishRun();
        }
      }, 500);
    } else {
      clearInterval(keystrokeIntervalRef.current);
    }
    return () => clearInterval(keystrokeIntervalRef.current);
  }, [isActive, lastKeystroke]);

  const finishRun = async () => {
    audioRef.current.play();
    setFinished(true);
    setEndTime(Date.now());
    setIsDone(true);
    setIsActive(false);
    clearInterval(intervalRef.current);
    clearInterval(keystrokeIntervalRef.current);
    await navigator.clipboard.writeText(text);
    if (time < 30) return setMoreThanMinRound(false);
    if (time > highscore) {
      setIsHighscore(true);
      setHighscore(time);
    }
    saveRunToDb();
    setMoreThanMinRound(true);
    setFailureMessage(`You're done! This run lasted ${time}.}`);
  };

  const startNewRun = () => {
    audioRef.current.pause();
    setCopyText('Copy my writing');
    setTime(0);
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

  const saveRunToDb = async () => {
    setSavingRound(true);
    setSubmittingRunToDB(true);

    try {
      const response = await fetch('/api/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address || '0x4non',
          timeSpent: time,
          wordCount: text.split(' ').length,
          content: text,
        }),
      });
      const data = await response.json();
      toast.success('Your run was added to your profile');
      if (data) {
        // Assume leaderboard is sorted by timeSpent in descending order.
        // Find the correct position to insert the new run.
        let insertIndex = leaderboard.findIndex(run => run.timeSpent < time);
        if (insertIndex === -1) {
          // If the new run has the lowest timeSpent, append it at the end.
          insertIndex = leaderboard.length;
        }
        // Insert the new run into leaderboard at the correct position.
        leaderboard.splice(insertIndex, 0, {
          timeSpent: time,
          wordCount: text.split(' ').length,
          content: text,
        });
        setLeaderboard(leaderboard);
        setRunSubmitted(true);
        setSubmittingRunToDB(false);
        setSavingRound('Save to DB');
        setSavedToDb(true);

        console.log('the data from the server is: ', data);
      }
    } catch (error) {
      console.log('the error is:', error);
    }
  };

  const submitRunWithThisUsername = async () => {
    setSubmittingRunToDB(true);
  };

  const updateSadhanas = async () => {
    const response = await fetch('/api/update-sadhanas');
    const data = await response.json();
  };

  const spendOneLifeAndGoBackToWriting = () => {
    if (lives === 0) {
      return alert(
        'You dont have more lives. You can buy one for 1APE or wait until tomorrow.'
      );
    }
    setLives(x => x - 1);
    setSavingRound(false);
    setSavedToDb(false);
    setIsDone(false);
    setFinished(false);
  };

  const handleLoadImage = () => {
    setAnkyImageUrl('/images/apigo.png');
    setImageLoaded(true);
  };
  const pasteText = async () => {
    await navigator.clipboard.writeText(text);
    alert('Your writing is in your clipboard');
  };

  return (
    <div
      className='text-thewhite relative  flex flex-col items-center overflow-y-scroll py-16 justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 73px)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
      }}
    >
      <audio ref={audioRef}>
        <source src='/sounds/bell.mp3' />
      </audio>
      <div className='w-full px-2  mt-48 md:mt-2 md:w-1/2 lg:w-1/3'>
        {finished ? (
          <>
            {moreThanMinRun ? (
              <>
                <>
                  <div>
                    {displayStepsForGettingImage ? (
                      <StepsForGettingImage text={text} />
                    ) : (
                      <div>
                        {runSubmitted && address ? (
                          <div>
                            <p>
                              Ready. Now do you want to get a customized avatar
                              based on what you just wrote?
                            </p>
                            <div className='flex space-x-2 my-2'>
                              <Button
                                buttonAction={() => {
                                  setDisplayStepsForGettingImage(true);
                                }}
                                buttonText='Yes'
                                buttonColor='bg-thegreenbtn'
                              />
                              <Button
                                buttonAction={() => {
                                  alert(
                                    "Ok, if this didn't caught your attention, I have work to do. Thx for trying it out."
                                  );
                                }}
                                buttonText='No'
                                buttonColor='bg-theredbtn'
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            {isHighscore ? (
                              <div>
                                <p>
                                  NEW HIGHSCORE! CONGRATULATIONS. You made it
                                  for {time} seconds.
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p>You are done. Your score is {time}.</p>
                              </div>
                            )}
                            {address ? (
                              <div>
                                <p>Your run was saved into the db.</p>
                                <div className='flex space-x-2'>
                                  <button
                                    className='px-4 py-2 rounded-xl bg-thegreen h-fit hover:opacity-80'
                                    onClick={() => {
                                      pasteText();
                                    }}
                                  >
                                    Copy what I wrote
                                  </button>
                                  <button
                                    className='px-4 py-2 rounded-xl bg-theorange h-fit hover:opacity-80'
                                    onClick={() => {
                                      router.push(`/u/${address}`);
                                    }}
                                  >
                                    See my runs
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p>
                                  If you had your wallet connected, you would
                                  have a profile on which to track your progress
                                  and do all kinds of crazy stuff with what you
                                  write.
                                </p>
                                <div className='flex space-x-2'>
                                  <button
                                    className='px-4 py-2 rounded-lg bg-thegreen h-fit hover:opacity-80'
                                    onClick={() => {
                                      pasteText();
                                    }}
                                  >
                                    Copy what I wrote
                                  </button>
                                  <button
                                    className='px-4 py-2 rounded-lg bg-theorange h-fit hover:opacity-80'
                                    onClick={startNewRun}
                                  >
                                    Play Again
                                  </button>
                                  <ConnectWallet
                                    auth={{
                                      loginOptional: false,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              </>
            ) : (
              <div className=''>
                <p>
                  You are done. Your score is {time}. You need to try harder
                  next time.
                </p>
                <p>Min score to qualify is 30 seconds.</p>
                <div className='flex justify-center space-x-2'>
                  <Button
                    buttonText={copyText}
                    buttonAction={pasteText}
                    buttonColor='bg-thegreen'
                  />
                  <div className=''>
                    <Button
                      buttonText='Start Again'
                      buttonAction={startNewRun}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {
              <div
                className={`${time > 0 && 'fade-out'}} ${time > 1 && 'hidden'}`}
              >
                <p
                  className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
                >
                  {userPrompt}
                </p>
                <p className='text-base text-gray-600 my-1'>
                  My world will only open to those who prove themselves.
                </p>
                <p>If you stop writing for 1 second, you will fail.</p>
                <p className={`${righteous.className}  font-bold`}>
                  Write as if there was no tomorrow.
                </p>
                <p className={`${righteous.className} font-bold`}>
                  See you on the otherside.
                </p>
              </div>
            }

            <textarea
              ref={textareaRef}
              style={{
                top: `${time > 10 ? '6' : '30'}%`,
                bottom: `${time > 10 ? '0' : '30'}%`,
                left: `${time > 10 ? '0' : '30'}%`,
                right: `${time > 10 ? '0' : '30'}%`,
                transition: 'top 1s, bottom 1s, left 1s, right 1s', // smooth transition over 1 second
              }}
              className={`${pacifico.className}  absolute p-4 text-thewhite text-2xl border border-gray-300 rounded-md  bg-opacity-50 bg-theblack`}
              value={text}
              onChange={handleTextChange}
            ></textarea>
            {time > 1 && (
              <div
                className={`${
                  time > 0 && 'fade-in'
                } flex flex-col justify-center items-center text-opacity-20 mb-4`}
              >
                <div className='text-9xl'>{time}</div>
                <p className={`${righteous.className}  font-bold`}>
                  Write as if there was no tomorrow.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WritingGame;
