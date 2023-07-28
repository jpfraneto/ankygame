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
  const [submittingRunToDB, setSubmittingRunToDB] = useState(false);
  const [runSubmitted, setRunSubmitted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [savingRound, setSavingRound] = useState(false);
  const [moreThanMinRun, setMoreThanMinRound] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [isHighscore, setIsHighscore] = useState(false);
  const [savedToDb, setSavedToDb] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [ankyImageUrl, setAnkyImageUrl] = useState('/images/anky.png');
  const [failureMessage, setFailureMessage] = useState('');
  const [copyText, setCopyText] = useState('Copy my writing');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
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

              <p className={`${righteous.className}  font-bold`}>
                Feel the inquiry. Read it with intention. Answer with your
                heart.
              </p>

              <p className={`${righteous.className}  font-bold`}>
                Write whatever comes up. Your truth, without judgements.
              </p>
              <p className={`${righteous.className}  font-bold`}>
                Life is always watching.
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
              time <= 10 && 'md:w-3/5 md:aspect-video w-full h-square'
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
              <div className={`${time > 10 ? 'text-9xl' : 'text-2xl'}`}>
                {time}
              </div>

              {finished ? (
                <div className='flex flex-col md:flex-row space-x-2'>
                  {runSubmitted ? (
                    <Button
                      buttonColor='bg-thegreenbtn'
                      buttonAction={startNewRun}
                      buttonText='play again (1 💚)'
                    />
                  ) : (
                    <>
                      {lives > 0 ? (
                        <Button
                          buttonColor='bg-thegreenbtn'
                          buttonAction={spendOneLifeAndGoBackToWriting}
                          buttonText='continue writing (1 💚)'
                        />
                      ) : (
                        <Button
                          buttonColor='bg-theredbtn'
                          buttonAction={() => alert('You ran out of 💚')}
                          buttonText='no more 💚.'
                        />
                      )}
                    </>
                  )}

                  <Button
                    buttonAction={saveRunToDb}
                    buttonText={
                      runSubmitted
                        ? 'Saved'
                        : savingRound
                        ? 'saving...'
                        : `save writing ${address ? 'on my profile' : 'anon'}`
                    }
                  />
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
    </div>
  );
};

export default WritingGame;
