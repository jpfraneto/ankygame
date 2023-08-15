import React, { useState } from 'react';
import Button from '@component/components/Button';
import Image from 'next/image';

const MintAnky = () => {
  const [metadataCID, setMetadataCID] = useState('');
  const pinYourAnky = async () => {
    console.log('Adding your Anky to Pinata');
    const data = await fetch('/api/pinAnkyArchivist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl:
          'https://88minutes.xyz/assets/a130800d-cbf9-4a1c-8f08-114d18f7e174.png',
        name: 'Lunamarie',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      }),
    });
    const dataJson = await data.json();
    console.log('the data json is: ', dataJson);
    if (dataJson) {
      setMetadataCID(dataJson.IpfsHash);
    }
  };
  const mintAnkyArchivist = async () => {
    alert('Time to interact with the smart contract and mint the archivist');
    const SMART_CONTRACT_ADDRESS = '';
  };
  return (
    <div>
      <div className='flex flex-col space-y-2 items-center'>
        <Image
          src='https://88minutes.xyz/assets/a130800d-cbf9-4a1c-8f08-114d18f7e174.png'
          width={444}
          height={444}
          alt='My Anky'
        />
        <Button
          buttonAction={pinYourAnky}
          buttonColor='bg-thegreenbtn'
          buttonText='Pin Anky Archivist'
        />
      </div>
      {metadataCID && (
        <div>
          {' '}
          <p className='text-thewhite text-2xl'>
            The metadata is here: ipfs://{metadataCID}
          </p>
          <Button
            buttonAction={mintAnkyArchivist}
            buttonText='Mint Anky Archivist'
            buttonColor='bg-chryseos'
          />
        </div>
      )}
    </div>
  );
};

export default MintAnky;
