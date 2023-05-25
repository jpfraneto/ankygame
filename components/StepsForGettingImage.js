import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';

const StepsForGettingImage = ({ text }) => {
  const [copyText, setCopyText] = useState('');
  const [ouch, setOuch] = useState(false);
  const [mintOptions, setMintOptions] = useState(false);
  const createPromptFromText = async () => {
    // HERE I NEED TO QUERY THE API OF OPENAI
    const basicText = `You are in charge of crafting a prompt for midjourney, which is an image generator. I will send you now a block of text that was written by a human being as a stream of consciousness, and your goal is to distill the essence of that writing so that you can come up with a graphic description of how the human that wrote it looks. Please avoid direct references to the writer, the goal of the prompt is just to get a description of how the human that created it looks like. The first part of the prompt should say: \n
        "https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon"... \n\n Come up with a conscise writing for this, and send it back to me so that I can prompt it to midjourney. \n Here is the block of text:`;
    const prompt = basicText + '   ' + `"${text}"`;
    pasteTextOnClipboard(prompt);
    setOuch(true);
  };

  const pasteTextOnClipboard = async promptText => {
    await navigator.clipboard.writeText(promptText);
    setCopyText('The prompt was copied on your clipboard');
  };
  return (
    <div>
      {' '}
      {mintOptions ? (
        <div>Mint Info</div>
      ) : (
        <div>
          <h4 className='text-2xl mb-2 '>
            To create a unique avatar based on what you wrote:
          </h4>
          <ul>
            <li className='mb-2'>
              1. Get the prompt for chatgtp based on what you wrote by clicking
              this button{' '}
              {ouch ? (
                <Button
                  buttonText='Ouch! That hurted.'
                  buttonAction={() => {}}
                  buttonColor='bg-theredbtn'
                />
              ) : (
                <Button
                  buttonText='Click me.'
                  buttonAction={createPromptFromText}
                  buttonColor='bg-thegreenbtn'
                />
              )}
            </li>
            <li className='mb-2'>
              2. Go to the chatgtp tab that is open right above here, and paste.
              What is in your clipboard is the prompt for that exact chat
              section of the app. What it sends you back, you have to copy that
              and come back here.
            </li>
            <li className='mb-2'>
              3. Now, with what you just copied, go to the discord app and send
              the /imagine command to the midjourney bot and paste what you have
              there inside the image command.
            </li>
            <li className='mb-2'>
              4. Then, choose one of those four images, and that is the
              representation of anky that will exist with you the rest of your
              life. This is a gift, from me, to you. If you want to get the NFT,
              send me an email to jpfraneto@gmail.com with your wallet address.
              Just your wallet address of the ethereum network. That's all I
              need. If not, any feedback that you can give me helps me make this
              thing even more awesome.
            </li>
            <li className='mb-2'>Thank you.</li>
            <li className='mb-2 '>jp</li>

            {mintOptions && (
              <div>
                <p>Here are the steps for minting the NFT</p>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StepsForGettingImage;
