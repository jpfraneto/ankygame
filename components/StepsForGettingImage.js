import React, { useState, useRef } from 'react';
import Button from '@component/components/Button';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Righteous } from 'next/font/google';
import { useAddress } from '@thirdweb-dev/react';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const StepsForGettingImage = ({ text, time }) => {
  const address = useAddress();
  const [step, setStep] = useState(1);
  const [copyText, setCopyText] = useState('');
  const [ouch, setOuch] = useState(false);
  const [mintingProfile, setMintingProfile] = useState(false);
  const [startingAnkyState, setStartingAnkyState] = useState(true);
  const [ankyResponse, setAnkyResponse] = useState('');
  const [ankyThinking, setAnkyThinking] = useState(false);
  const [promptForMidjourneyReady, setPromptForMidjourneyReady] =
    useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [tookToMidjourney, setTookToMidjourney] = useState(false);
  const [personDescription, setPersonDescription] = useState(null);
  const [textCopied, setTextCopied] = useState(false);

  const [promptForMidjourneyText, setPromptForMidjourneyText] = useState('');
  const [mintOptions, setMintOptions] = useState(false);

  const fileInputRef = useRef(null);

  const askChatGTPforImagePrompt = async () => {
    setOuch(true);
    setAnkyThinking(true);
    try {
      const response = await fetch('/api/ankybot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      setAnkyResponse(data.imagePromptForMidjourney);
      setPersonDescription(data.bio);
    } catch (error) {
      alert('There was an error in here. I will work on fixing it.');
    }
  };

  const pasteTextOnClipboard = async promptText => {
    await navigator.clipboard.writeText(promptText);
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

  const handleMintProfile = async e => {
    setMintingProfile(true);
    try {
      const response = await axios.post('/api/mint', {
        image: uploadedImage,
        description: personDescription,
        address: address,
        writing: text,
        timeSpent: time,
      });
      console.log('the axios response is: ', response);
      setMintingProfile(false);
      setStep(4);
    } catch (error) {
      alert('THERE WAS A FUCKING ERROR. CONTACT JP ASAP');
    }
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 5) {
      alert('File size exceeds 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setUploadedImage(reader.result); // Save Base64 image string
    };
    reader.readAsDataURL(file);
  };

  const mintNFT = async () => {
    alert(
      'Thanks for believing in my work. I will mint this NFT on the ethereum network, and send it to you as a present. Welcome to my world, this is just the beginning.'
    );
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // const transaction = await contract.mintNFT(uploadedImage); // depends on your contract's mint function
    // await transaction.wait();
  };

  return (
    <div className='text-center '>
      {/* {text && (
        <Button
          buttonAction={() => {
            pasteTextOnClipboard(text);
          }}
          buttonText='Copy what I wrote'
        />
      )} */}
      {step === 1 && (
        <div>
          {startingAnkyState && (
            <div>
              <p>
                This button will transform what you wrote into a prompt for
                midjourney.
              </p>
              <div className='flex flex-row justify-center'>
                {ouch ? (
                  <Button
                    buttonText='Ouch! That hurted.'
                    buttonAction={() => {}}
                    buttonColor='bg-thered'
                  />
                ) : (
                  <Button
                    buttonText='Click me.'
                    buttonAction={() => {
                      setStartingAnkyState(false);
                      askChatGTPforImagePrompt();
                    }}
                    buttonColor='bg-theorange border border-thewhite'
                  />
                )}
              </div>
            </div>
          )}

          {ankyThinking && (
            <div className='py-0 flex flex-col space-x-2 items-center'>
              <div className='rounded-full glowing mb-4 overflow-hidden shadow-lg border-4 border-thewhite'>
                <Image
                  src='/images/anky.png'
                  width={333}
                  height={333}
                  className=''
                  alt='Anky'
                />
              </div>

              {ankyResponse === '' ? (
                <p className='mt-2 md:w-2/5 '>
                  I&apos;m looking in the ether for the prompt of an image that
                  will describe you in my world... Please stand still and
                  breathe.
                </p>
              ) : (
                <div className='mt-2 overflow-y-scroll md:w-3/5'>
                  <p className='overflow-y-scroll h-48'>{ankyResponse}</p>
                  <div className='flex flex-row justify-center'>
                    {promptForMidjourneyReady ? (
                      <Button
                        buttonAction={() => {
                          setStep(3);
                        }}
                        buttonText='You have the prompt. Now send it to jp'
                        buttonColor='bg-thegreenbtn'
                      />
                    ) : (
                      <Button
                        buttonAction={() => {
                          pasteTextOnClipboard(ankyResponse);
                          setPromptForMidjourneyReady(true);
                        }}
                        buttonText='Copy Prompt'
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className='mt-2 overflow-y-scroll mx-auto md:w-3/5'>
          {tookToMidjourney ? (
            <div className='mt-2 overflow-y-scroll flex flex-col items-center mx-auto justify-center md:w-full'>
              <p>
                Save the image you just generated wherever you want in the
                filesystem of this computer and proceed to the next step:
              </p>

              <Button
                buttonAction={() => setStep(3)}
                buttonText='If you downloaded the image, click here for the next step.'
                buttonColor='bg-thegreenbtn'
              />
            </div>
          ) : (
            <div className='mt-2 overflow-y-scroll flex flex-col items-center mx-auto justify-center md:w-full'>
              <p>
                Great. Now that you have the prompt in your clipboard. Send it
                to midjourney using the /imagine command.
              </p>
              <p>
                If you don&apos;t have a midjourney acccount... What are you
                doing with your life? Wake up. Life is happening out there.
              </p>
              <p>Send it and allow magic to happen in front of your eyes.</p>
              <a
                href='https://discord.com/channels/@me/1054830741042774016'
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => setTookToMidjourney(true)}
                className={`bg-thegreen whitespace-nowrap align-self-start relative flex flex-row gap-2 font-medium justify-center items-center w-fit false cursor-pointer hover:scale-[1.02] min-w-[112px] text-sm rounded-xl px-6 h-11 ease-in transition-transform bg-black text-white mb-4`}
              >
                Got it. Take me to discord plz.
              </a>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div>
          {true ? (
            <div className='flex h-96 flex-col items-center'>
              <div className='flex flex-row h-full justify-center '>
                {personDescription && (
                  <div className='w-1/2  h-full overflow-y-scroll'>
                    {personDescription.split('\n').map((x, i) => {
                      return (
                        <p key={i} className={`${righteous.className} mb-2`}>
                          {x}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className='my-4'>
                <Button
                  buttonText='Mint Profile'
                  buttonAction={() => alert('LFG')}
                />
              </div>
            </div>
          ) : (
            <div className='md:w-3/5 mx-auto'>
              <p>
                Now, please upload the image here. You will be able to generate
                a unique profile for you based on it.
              </p>
              <input
                type='file'
                ref={fileInputRef}
                accept='image/png'
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <p>Wow. You are now officially part of the community.</p>
          <p>
            Check out your new profile <Link href='/me'>HERE</Link>
          </p>
        </div>
      )}

      {/* {step === 5 ? (
        <p>Thank you, for being who you are. You are awesome.</p>
      ) : (
        <div className='flex justify-center mt-4 space-x-4'>
          {step !== 1 && (
            <Button
              buttonText='Previous'
              buttonAction={previousStep}
              buttonColor='bg-theredbtn'
            />
          )}

          <Button
            buttonText='Next'
            buttonAction={nextStep}
            buttonColor='bg-thegreenbtn'
          />
        </div>
      )} */}
    </div>
  );
};

export default StepsForGettingImage;
