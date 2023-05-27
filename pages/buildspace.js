import Button from '@component/components/Button';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import RunModal from '@component/components/RunModal';
import Leaderboard from '@component/components/Leaderboard';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import StepsForGettingBuildspaceImage from '@component/components/StepsForGettingBuildspaceImage';
import { FaHeartbeat } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import NavbarComponent from '@component/components/NavbarComponent';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const GamePage = () => {
  const audioRef = useRef();
  const address = useAddress();
  const router = useRouter();
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [lives, setLives] = useState(8);
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
  const [twitterUsername, setTwitterUsername] = useState('');
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
    if (time <= 0) return setMoreThanMinRound(false);
    if (time > highscore) {
      setIsHighscore(true);
      setHighscore(time);
    }
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
    if (!twitterUsername) return alert('Please add your username');

    try {
      const response = await fetch('/api/buildspace-gtp', {
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
      const data = await response.json();
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
    alert(`Add ${twitterUsername}`);
  };

  const updateSadhanas = async () => {
    const response = await fetch('/api/update-sadhanas');
    const data = await response.json();
    console.log('the data is: ', data);
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

  const deleteAllRuns = async () => {
    try {
      const response = await fetch('/api/runs', {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('All runs deleted successfully');
        // clear leaderboard
        setLeaderboard([]);
      } else {
        console.error('Failed to delete runs');
      }
    } catch (error) {
      console.error('An error occurred while deleting runs', error);
    }
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
      className='text-thewhite relative min-h-screen flex flex-col items-center overflow-y-scroll py-16 justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 30px)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
      }}
    >
      <NavbarComponent
        setModalOpen={setModalOpen}
        highscore={highscore}
        lives={lives}
        router={router}
        address={address}
      />
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
                      <StepsForGettingBuildspaceImage text={text} />
                    ) : (
                      <div>
                        {runSubmitted ? (
                          <div>
                            <p>
                              Ready. Now do you want to get a customized image
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

                            <p>If you want, you can save your run to the db.</p>
                            <label>
                              Twitter username:
                              <input
                                type='text'
                                className='px-2 py-1 mx-2 rounded text-theblack'
                                required
                                placeholder='elonmusk'
                                value={twitterUsername}
                                onChange={e =>
                                  setTwitterUsername(e.target.value)
                                }
                              />
                            </label>

                            <div className='flex flex-nostretch items-center mt-4 justify-center space-x-2'>
                              {lives === 0 ? (
                                <button
                                  onClick={spendOneLifeAndGoBackToWriting}
                                  className='flex flex-col items-center bg-theblack text-thewhite px-4 py-2 border-thewhite hover:cursor-not-allowed text-sm justify-center font-medium border rounded-lg'
                                >
                                  <span>No lives left</span>
                                </button>
                              ) : (
                                <button
                                  onClick={spendOneLifeAndGoBackToWriting}
                                  className='flex flex-col items-center bg-theblack text-thewhite px-4 py-2 border-thewhite text-sm  w-48 justify-center font-medium border rounded-lg hover:opacity-60'
                                >
                                  <span className='w-fit'>Keep writing</span>
                                  <span>1 💚</span>
                                </button>
                              )}
                              <button
                                className='px-4 py-2 rounded-xl bg-thegreenbtn h-fit hover:opacity-80'
                                onClick={() => {
                                  saveRunToDb();
                                }}
                              >
                                {submittingRunToDB
                                  ? 'Adding...'
                                  : 'Add to leaderboard'}
                              </button>

                              <button
                                className='px-4 py-2 rounded-xl bg-thegreen h-fit hover:opacity-80'
                                onClick={() => {
                                  pasteText();
                                }}
                              >
                                Copy what I wrote
                              </button>
                            </div>
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
                  {lives === 0 ? (
                    <button
                      onClick={spendOneLifeAndGoBackToWriting}
                      className='flex flex-col items-center bg-theblack text-thewhite px-4 py-2 border-thewhite hover:cursor-not-allowed text-sm justify-center font-medium border rounded-lg'
                    >
                      <span>No lives left</span>
                    </button>
                  ) : (
                    <button
                      onClick={spendOneLifeAndGoBackToWriting}
                      className='flex flex-col items-center bg-theblack text-thewhite px-4 py-2 border-thewhite text-sm justify-center font-medium border rounded-lg hover:opacity-60'
                    >
                      <span>Continue</span>
                      <span>1 💚</span>
                    </button>
                  )}
                  <Button
                    buttonText={copyText}
                    buttonAction={pasteText}
                    buttonColor='bg-thegreen'
                  />
                  <div className=''>
                    <Button
                      buttonText='Start from scratch'
                      buttonAction={startNewRun}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p
              className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
            >
              write about s3 irl.
            </p>

            <p>If you stop writing for 1 second, you will fail.</p>

            <p className={`${righteous.className}  font-bold`}>
              Write as if there was no tomorrow.
            </p>
            <p className={`${righteous.className} font-bold`}>
              See you on the otherside.
            </p>
            <textarea
              ref={textareaRef}
              className='w-full h-64 p-4 text-thewhite border border-gray-300 rounded-md mb-4 bg-opacity-50 bg-theblack'
              value={text}
              onChange={handleTextChange}
            ></textarea>
            <div className='flex justify-center items-center mb-4'>
              <div className='text-4xl'>{time} </div>
            </div>
          </>
        )}
      </div>
      <RunModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Leaderboard leaderboard={leaderboard} />
      </RunModal>
    </div>
  );
};

export default GamePage;
