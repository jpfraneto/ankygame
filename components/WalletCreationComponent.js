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
          <p>Buen trabajo.</p>
          <p>Estás list@ para conocer a tu Anky?</p>
          <div className='flex space-x-2'>
            <Button
              buttonText='No, necesito ver las palabras de nuevo'
              buttonAction={() => {
                setSeedPhrase(false);
                setWalletCorrectlyStored(false);
              }}
              buttonColor='bg-theorange'
            />
            <Button
              buttonText='Démosle.'
              buttonAction={() => setWalletWasCreated(true)}
              buttonColor='bg-thegreenbtn'
            />
          </div>
        </div>
      ) : (
        <div>
          {seedPhrase ? (
            <div className='flex flex-col items-center justify-center'>
              <p>Cuál era la palabra número {indexForChecking + 1}?</p>
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
                  buttonText='Avanzar'
                  buttonColor='bg-thegreenbtn'
                />
                <Button
                  buttonAction={() => setSeedPhrase(false)}
                  buttonText='Atrás'
                  buttonColor='bg-theorange'
                />
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <p className='mb-1'>
                Estas 12 palabras son tu llave del Ankyverso.
              </p>
              <p className='mb-1'>Anótalas y guarda ese papel seguro.</p>
              <p className='mb-1'>
                No vas a poder acceder a esta información nunca más.
              </p>
              <p className='mb-3'>
                Esta es la única vez que vas a ver esta llave.
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
                buttonText='Guardé mis 12 palabras.'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletCreationComponent;
