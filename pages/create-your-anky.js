import React, { useState } from 'react';
import Image from 'next/image';

const CreateYourAnky = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState(null);
  const [progress, setProgress] = useState(null);
  const updatePrompt = e => {
    setPrompt(e.target.value);
  };
  const fetchCreateAnky = async () => {
    console.log('in here', prompt);
    const data = await fetch('/api/createAnky', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const dataJson = await data.json();
    console.log('the imageDataJson is: ', dataJson);
    const fetchingImage = setInterval(async () => {
      const data = await fetch('/api/fetchImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageId: dataJson.imagineApiId,
        }),
      });
      const imageDataJson = await data.json();
      console.log('AAACA :', imageDataJson.status);
      if (!imageDataJson) return;
      if (imageDataJson && imageDataJson.status === 'in-progress') {
        setProgress(imageDataJson.progress);
      }
      if (imageDataJson && imageDataJson.status === 'completed') {
        console.log('inside the completed route');
        console.log(imageDataJson);
        setProgress(null);
        clearInterval(fetchingImage);
        const upscaledUrlsLinks = imageDataJson.upscaled.map(
          upscaledId => `https://88minutes.xyz/assets/${upscaledId}.png`
        );
        setGeneratedImages(upscaledUrlsLinks);
      }
    }, 4444);
  };
  return (
    <div>
      <input
        type='text'
        onChange={updatePrompt}
        className='text-theblack p-2 w-96 text-2xl rounded-xl mt-16'
      />
      <br />
      <button
        className='px-4  py-2 m-2 bg-emblazion text-2xl rounded-xl hover:bg-thelightblue'
        onClick={fetchCreateAnky}
      >
        go!
      </button>
      {generatedImages && (
        <div>
          {generatedImages.map((x, i) => {
            return <Image src={x} width={300} height={300} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CreateYourAnky;
