import React, { useState } from 'react';
import Button from '@component/components/Button';
import axios from 'axios';

const StepsForGettingImage = ({ text }) => {
  const [step, setStep] = useState(1);
  const [copyText, setCopyText] = useState('');
  const [ouch, setOuch] = useState(false);
  const [mintOptions, setMintOptions] = useState(false);

  const createPromptFromText = async () => {
    const basicText = `You are in charge of crafting a prompt for midjourney...`;
    const prompt = basicText + '   ' + `"${text}"`;
    pasteTextOnClipboard(prompt);
    setOuch(true);
  };

  const pasteTextOnClipboard = async promptText => {
    await navigator.clipboard.writeText(promptText);
    setCopyText('The prompt was copied on your clipboard');
    setStep(2);
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <h4 className='text-5xl mb-64'>
        To create a unique avatar based on what you wrote:
      </h4>
      {step === 1 && (
        <div>
          <p>
            1. Get the prompt for chatgtp based on what you wrote by clicking
            this button
          </p>
          {ouch ? (
            <Button
              buttonText='Ouch! That hurted.'
              buttonAction={() => {}}
              buttonColor='bg-thered'
            />
          ) : (
            <Button
              buttonText='Click me.'
              buttonAction={createPromptFromText}
              buttonColor='bg-theorange border border-thewhite'
            />
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <p>
            2. Go to the chatgtp tab that is open right above here, and paste.
            What is in your clipboard is the prompt for that exact chat section
            of the app. What it sends you back, you have to copy that and come
            back here.
          </p>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>
            3. Now, with what you just copied, go to the discord app and send
            the /imagine command to the midjourney bot and paste what you have
            there inside the image command.
          </p>
        </div>
      )}

      {step === 4 && (
        <div>
          <p>
            4. Then, choose one of those four images, and that is the
            representation of anky that will exist with you the rest of your
            life.
          </p>
        </div>
      )}

      {step === 5 && (
        <div>
          <p>
            This is a gift, from me, to you. If you want to get the NFT, send me
            an email to jpfraneto@gmail.com with your wallet address. Just your
            wallet address of the ethereum network. That's all I need. If not,
            any feedback that you can give me helps me make this thing even more
            awesome.
          </p>
        </div>
      )}

      {step === 5 ? (
        <p>Thank you, for being who you are. You are awesome.</p>
      ) : (
        <div className='flex justify-center mt-4 space-x-4'>
          <Button
            buttonText='Previous'
            buttonAction={previousStep}
            buttonColor='bg-theredbtn'
          />
          <Button
            buttonText='Next'
            buttonAction={nextStep}
            buttonColor='bg-thegreenbtn'
          />
        </div>
      )}
    </div>
  );
};

export default StepsForGettingImage;
