import { ethers, BigNumber } from 'ethers';
import {
  useContract,
  useContractRead,
  MediaRenderer,
  useAddress,
} from '@thirdweb-dev/react';

import React, { useState, useEffect } from 'react';

const myanky = () => {
  const [myAnkyCharacter, setMyAnkyCharacter] = useState(null);
  const [prompt, setPrompt] = useState();
  const address = useAddress();
  console.log('the address is: ', address);
  const { contract } = useContract(
    '0x5806485215C8542C448EcF707aB6321b948cAb90'
  );
  const { data, isLoading } = useContractRead(contract, 'tokenOfOwnerByIndex', [
    address,
    0,
  ]);
  console.log('in here, the data is: ', data);

  useEffect(() => {
    if (data) {
      const yourNftIndex = BigNumber.from(data._hex).toString();
      fetchMetadataFromLastMinted(yourNftIndex);
    }
    async function fetchMetadataFromLastMinted(index) {
      const metadata = await fetch(
        `https://ipfs.thirdwebstorage.com/ipfs/bafybeibawzhxy5iu4jtinkldgczwt43jsufah36m4zl5b7zykfsj5sx3uu/${index}`
      );
      const jsonResponse = await metadata.json();

      console.log('the metadata is: ', jsonResponse);
      setMyAnkyCharacter(jsonResponse);
    }
  }, [data]);
  const handlePromptChange = e => {
    setPrompt(e.target.value);
  };
  const askYourNft = async () => {
    return alert(`Ask ${prompt}`);
    const response = await fetch('/api/askanky');
  };
  if (isLoading) return <p>Loading</p>;
  if (!myAnkyCharacter) return <p>Please buy an Anky to access this thing</p>;
  return (
    <div className='text-thewhite flex w-full px-8 pt-20'>
      <div className='flex flex-col rounded-2xl aspect-square overflow-hidden'>
        <MediaRenderer src={myAnkyCharacter.image} />
        <h2 className='text-2xl'>{myAnkyCharacter.name}</h2>
      </div>
      <div className='flex flex-col px-8 w-full'>
        <input
          className='text-theblack rounded-xl h-12 w-1/2 px-2'
          placeholder={`Ask ${myAnkyCharacter.name} any question:`}
          onChange={handlePromptChange}
        />
        <br />
        <button
          className='px-4 py-2 bg-thelightblue border-theredbtn border-2 w-fit rounded-xl hover:opacit-70 hover:cursor-pointer'
          onClick={askYourNft}
        >
          Ask!
        </button>
        <p>{prompt}</p>
      </div>
    </div>
  );
};

export default myanky;
