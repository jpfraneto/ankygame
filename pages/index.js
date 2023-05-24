import Button from '@component/components/Button';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import RunModal from '@component/components/RunModal';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const GamePage = () => {
  const audioRef = useRef();
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [savingRound, setSavingRound] = useState(false);
  const [moreThanMinRun, setMoreThanMinRound] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRun, setSelectedRun] = useState(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [finishedText, setFinishedText] = useState(null);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [ankyImageUrl, setAnkyImageUrl] = useState('/images/anky.png');
  const [failureMessage, setFailureMessage] = useState('');
  const [copyText, setCopyText] = useState('Copy what I wrote');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [leaderboard, setLeaderboard] = useState([]);
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
    if (time < 180) return setMoreThanMinRound(false);
    setLoadingLeaderboard(true);
    fetch('/api/runs')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data);
        setLoadingLeaderboard(false);
      })
      .catch(err => console.error(err));
    setFailureMessage(`You're done! This run lasted ${time}.}`);
  };

  const startNewRun = () => {
    audioRef.current.pause();
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
    if (!twitterUsername) {
      return alert(
        'If you want to save the run, please add a Twitter username.'
      );
    }

    setSavingRound(true);

    try {
      const response = await fetch('/api/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          twitterUser,
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
          twitterUser: twitterUsername,
          timeSpent: time,
          wordCount: text.split(' ').length,
          content: text,
        });
        setLeaderboard(leaderboard);
        setSavingRound('Save to DB');
        setSavedToDb(true);
        console.log('the data from the server is: ', data);
      }
    } catch (error) {
      console.log('the error is:', error);
    }
  };

  const updateSadhanas = async () => {
    const response = await fetch('/api/update-sadhanas');
    const data = await response.json();
    console.log('the data is: ', data);
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
    setCopyText('Your text is in your clipboard');
  };

  return (
    <div
      className='text-thewhite relative min-h-screen flex items-center overflow-y-scroll py-16 justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 30px)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/mintbg.jpg')",
      }}
    >
      <audio ref={audioRef}>
        <source src='/sounds/bell.mp3' />
      </audio>
      <div className='w-3/4 md:w-1/2 lg:w-1/3'>
        {finished ? (
          <>
            {moreThanMinRun ? (
              <>
                {' '}
                {loadingLeaderboard ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <div>
                      <p>You are done. Your score is {time}</p>

                      <div>
                        {leaderboard && (
                          <div>
                            <h2
                              className={`${righteous.className} text-3xl font-bold mb-2 text-left`}
                            >
                              Leaderboard
                            </h2>
                            <table className='table-auto w-full'>
                              <thead className='bg-thegreen border-thewhite text-theblack'>
                                <tr>
                                  <th className='border border-thewhite px-4 py-1'>
                                    Username
                                  </th>
                                  <th className='border border-thewhite px-4 py-1'>
                                    Time spent
                                  </th>
                                  <th className='border border-thewhite px-4 py-1'>
                                    Word count
                                  </th>
                                  <th className='border border-thewhite px-4 py-1'>
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className='border-thewhite'>
                                {leaderboard.map((run, index) => (
                                  <tr
                                    key={index}
                                    className={
                                      index % 2 === 0
                                        ? 'bg-thered bg-opacity-70'
                                        : 'bg-thered bg-opacity-40'
                                    }
                                  >
                                    <td className='border px-4 py-1'>
                                      @{run.twitterUser}
                                    </td>
                                    <td className='border px-4 py-1'>
                                      {run.timeSpent}
                                    </td>
                                    <td className='border px-4 py-1'>
                                      {run.wordCount}
                                    </td>
                                    <td className='border px-4 py-1'>
                                      <button
                                        onClick={() => {
                                          setSelectedRun(run.content);
                                          setModalOpen(true);
                                        }}
                                        className='text-thegreen hover:text-black transition-colors duration-300'
                                      >
                                        Read
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                      {!savedToDb && (
                        <>
                          <p>
                            You can add your score to the system if you want, it
                            will be associated with the twitter username you
                            provide. If you lie, it&apos;s up to you.
                          </p>
                          <label>
                            Twitter username:
                            <input
                              type='text'
                              className='px-2 py-1 mx-2 rounded text-theblack'
                              required
                              placeholder='elonmusk'
                              value={twitterUsername}
                              onChange={e => setTwitterUsername(e.target.value)}
                            />
                          </label>
                        </>
                      )}

                      <div className='mt-3 flex space-x-2'>
                        <Button
                          buttonText={copyText}
                          buttonAction={pasteText}
                          buttonColor='bg-thegreen'
                        />
                        {!savedToDb && (
                          <Button
                            buttonText={
                              savingRound ? 'Adding Run...' : 'Save Run'
                            }
                            buttonColor='bg-thegreenbtn'
                            buttonAction={saveRunToDb}
                          />
                        )}
                      </div>
                      <div className='mt-4'>
                        <Button
                          buttonText='Try again.'
                          buttonAction={startNewRun}
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className=''>
                <p>
                  You are done. Your score is {time}. You need to try harder
                  next time.
                </p>
                <p>Min score to qualify is 180 (3 minutes).</p>
                <div className='mt-4'>
                  <Button buttonText='Try again.' buttonAction={startNewRun} />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p
              className={`${righteous.className} text-5xl font-bold mb-4 text-center`}
            >
              tell me who you are.
            </p>
            <p className='text-base text-gray-600 my-1'>
              My world will only open to those who prove themselves.
            </p>
            {/* <Button
              buttonText='Delete All Runs'
              buttonAction={deleteAllRuns}
              buttonColor='bg-red-500'
            /> */}

            <p>If you stop writing for 1 second, you will fail.</p>
            <p>For how long will you write?</p>

            <p className={`${righteous.className} font-bold`}>
              See you on the otherside.
            </p>
            <textarea
              ref={textareaRef}
              className='w-full h-64 p-4 text-theblack border border-gray-300 rounded-md mb-4'
              value={text}
              onChange={handleTextChange}
            ></textarea>
            <div className='flex justify-center items-center mb-4'>
              <div className='text-4xl'>{time} </div>
            </div>
            {!isActive && text.length > 0 && (
              <div className='text-red-500'>
                You stopped writing. That means you are thinking. You have to
                start again.
              </div>
            )}
          </>
        )}
      </div>
      <RunModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalOpen && <p>{selectedRun}</p>}
      </RunModal>
    </div>
  );
};

export default GamePage;
