import React, { useState } from 'react';
import Button from './Button';

const WalletCreationComponent = ({ words, setWalletWasCreated }) => {
  const [seedPhrase, setSeedPhrase] = useState(false);
  const [indexForChecking, setIndexForChecking] = useState(null);
  const [wordForChecking, setWordForChecking] = useState(1);
  const [walletCorrectlyStored, setWalletCorrectlyStored] = useState(false);
  const checkWordI = i => {
    if (wordForChecking === words[indexForChecking]) {
      setWalletCorrectlyStored(true);
    } else setSeedPhrase(false);
  };
  return (
    <div className='w-full mx-auto flex flex-col items-center justify-center'>
      {walletCorrectlyStored ? (
        <div className='w-full flex flex-col items-center'>
          <p>Good job.</p>
          <p>Are you ready to meet your Anky?</p>
          <div className='flex space-x-2'>
            <Button
              buttonText='Nope, I need to check the words again.'
              buttonAction={() => {
                setSeedPhrase(false);
                setWalletCorrectlyStored(false);
              }}
              buttonColor='bg-theorange'
            />
            <Button
              buttonText='LFG'
              buttonAction={() => setWalletWasCreated(true)}
              buttonColor='bg-thegreenbtn'
            />
          </div>
        </div>
      ) : (
        <div>
          {seedPhrase ? (
            <div className='flex flex-col items-center justify-center'>
              <p>Which was the word number {indexForChecking + 1}?</p>
              <input
                onChange={e => setWordForChecking(e.target.value)}
                type='text'
                className='mb-4 rounded-md p-2 text-theblack'
              />
              <div className='flex flex-row space-x-2'>
                <Button
                  buttonAction={() => {
                    checkWordI(2);
                  }}
                  buttonText='Submit'
                  buttonColor='bg-thegreenbtn'
                />
                <Button
                  buttonAction={() => setSeedPhrase(false)}
                  buttonText='Go Back'
                  buttonColor='bg-theorange'
                />
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <p className='mb-1'>
                These 12 words are your key to the ankyverse.
              </p>
              <p className='mb-1'>
                Write them down and store that paper securely.
              </p>
              <p className='mb-1'>
                You won&apos;t be able to access this information ever again.
              </p>
              <p className='mb-3'>
                This is the only time you will see this key.
              </p>
              <div className='flex w-fit flex-wrap justify-between mb-3'>
                {words.map((x, i) => (
                  <span
                    key={i}
                    className='px-2 w-1/5 py-1 rounded-xl bg-theorange border-2 border-thewhite m-2'
                  >
                    {`${i + 1}. ${x}`}
                  </span>
                ))}
              </div>
              <Button
                buttonColor='bg-thegreenbtn'
                buttonAction={() => {
                  const random = Math.round(Math.random() * 11);
                  setIndexForChecking(random);
                  setSeedPhrase(true);
                }}
                buttonText='I stored my 12 words'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletCreationComponent;
