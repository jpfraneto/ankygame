import React, { useState } from 'react';
import Button from '@component/components/Button';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

const StepsForGettingBuildspaceImage = ({ text }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [copyText, setCopyText] = useState('');
  const [ouch, setOuch] = useState(false);
  const [startingAnkyState, setStartingAnkyState] = useState(true);
  const [ankyResponse, setAnkyResponse] = useState('');
  const [ankyThinking, setAnkyThinking] = useState(false);
  const [promptForMidjourneyReady, setPromptForMidjourneyReady] =
    useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [responseError, setResponseError] = useState(false);
  const [tookToMidjourney, setTookToMidjourney] = useState(false);

  const [promptForMidjourneyText, setPromptForMidjourneyText] = useState('');
  const [mintOptions, setMintOptions] = useState(false);

  const askChatGTPforImagePrompt = async () => {
    setOuch(true);
    setAnkyThinking(true);
    try {
      const response = await fetch('/api/buildspace-gtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      setAnkyResponse(data.imagePromptForMidjourney);
    } catch (error) {
      setAnkyResponse(
        'Ooops, Anky is not available now. Please try again later.'
      );
      setResponseError(true);
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

  const pasteText = async () => {
    await navigator.clipboard.writeText(text);
    alert('Your writing is in your clipboard');
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    setUploadedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
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
    <div>
      {step === 1 && (
        <div>
          {startingAnkyState && (
            <div>
              <p>
                This button will send what you wrote to Anky and give you a
                prompt to get an image that describes it.
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
                  buttonAction={() => {
                    setStartingAnkyState(false);
                    askChatGTPforImagePrompt();
                  }}
                  buttonColor='bg-theorange border border-thewhite'
                />
              )}
            </div>
          )}

          {ankyThinking && (
            <div className='py-2 flex flex-col space-x-2 items-center'>
              <div className='rounded-full glowing overflow-hidden mb-4 shadow-lg border-4 border-thewhite'>
                <Image
                  src='/images/anky.png'
                  width={333}
                  height={333}
                  className=''
                  alt='Anky'
                />
              </div>

              {ankyResponse === '' ? (
                <p className='mt-2'>
                  I&apos;m looking in the ether for the description of an image
                  that captures the essence of what you wrote... Please stand
                  still and breathe.
                </p>
              ) : (
                <div className='mt-2'>
                  {ankyResponse.includes('wrong message') ? (
                    <div>
                      <p>
                        Please try again. Your message is not a stream of
                        consciousness talking about your experience in s3.
                      </p>
                      <Button
                        buttonAction={() => {
                          router.push('/');
                        }}
                        buttonText='Try again.'
                      />
                    </div>
                  ) : (
                    <div>
                      <p>{ankyResponse}</p>

                      {responseError ? (
                        <div>
                          <p>
                            You can always copy what you wrote and do this with
                            chatgtp directly.
                          </p>
                          <div>
                            <Button
                              buttonColor='bg-thegreen'
                              buttonAction={() => {
                                pasteText();
                              }}
                              buttonText='Copy what I wrote'
                            />
                            <Button
                              buttonColor='bg-thegreenbtn'
                              buttonAction={() => {
                                router.push('/');
                              }}
                              buttonText='Play Again'
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {promptForMidjourneyReady ? (
                            <Button
                              buttonAction={() => {
                                setStep(2);
                              }}
                              buttonText='You have the prompt. Click here for the next step.'
                              buttonColor='bg-thegreenbtn'
                            />
                          ) : (
                            <Button
                              buttonAction={() => {
                                pasteTextOnClipboard(ankyResponse);
                                setPromptForMidjourneyReady(true);
                              }}
                              buttonText='Copy Description'
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          {tookToMidjourney ? (
            <div>
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
            <div>
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
          {imageUrl ? (
            <div className='flex flex-col items-center'>
              <Image
                src={imageUrl}
                alt='Generated image for the user'
                width={333}
                height={333}
                className='border-4 bg-theblack border-thewhite '
              />
              <div className='my-4'>
                <Button
                  buttonText='Mint NFT'
                  buttonAction={() => {
                    setStep(4);
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              <p>
                Now, please upload the image here. You will be able to generate
                a unique NFT for you based on it.
              </p>
              <input
                type='file'
                accept='image/png'
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <p>
            You will eventually be able to mint that avatar as an NFT, and it
            will be your access key for the world that I&apos;m creating.
          </p>
          <p>Welcome. This is just the beginning.</p>
          <p>You can come back here when you want. I&apos;ll be waiting.</p>
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

export default StepsForGettingBuildspaceImage;
