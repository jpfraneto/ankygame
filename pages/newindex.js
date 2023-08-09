import React, { useState, useRef, useEffect } from 'react';

import WritingGame from '@component/components/WritingGame';
import Head from 'next/head';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  useAddress,
  ConnectWallet,
  Web3Button,
  useContract,
  useNFTBalance,
  useContractWrite,
  useSigner,
  walletConnect,
  MediaRenderer,
} from '@thirdweb-dev/react';

import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { ethers, BigNumber } from 'ethers';

const GamePage = ({}) => {
  const signer = useSigner();
  const address = useAddress();
  const [lifeBarLength, setLifeBarLength] = useState(0);
  const [lives, setLives] = useState(3);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [contract, setContract] = useState(null);
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState('');
  const [loadingPage, setLoadingPage] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socialsForDisplay, setSocialsForDisplay] = useState(false);
  const [socialsLink, setSocialsLink] = useState('');
  const [tokenId, setTokenId] = useState(null);

  let sdk;
  if (signer) {
    sdk = ThirdwebSDK.fromSigner(signer);
  }

  useEffect(() => {
    const loadSmartContract = async () => {
      if (signer) {
        console.log('insidere');
        sdk = ThirdwebSDK.fromSigner(signer);
      }
      if (sdk) {
        const contractResponse = await sdk.getContract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        );
        if (contractResponse) {
          setContract(contractResponse);
        }
      }
      setLoadingPage(false);
    };
    loadSmartContract();
  }, [signer]);

  useEffect(() => {
    const checkIfMinted = async () => {
      try {
        if (contract && address) {
          const data = await contract.call('tokenOfOwnerByIndex', [address, 0]);
          const tokenOfAddress = BigNumber.from(data._hex).toString();
          setAlreadyMinted(true);
          setTokenId(tokenOfAddress);
        }
      } catch (error) {
        console.log('the error is: ', error);
      }
      setLoading(false);
    };
    checkIfMinted();
  }, [address, contract]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoadingMetadata(true);
        const data = await fetch(
          `https://ipfs.thirdwebstorage.com/ipfs/${process.env.NEXT_PUBLIC_METADATA_IPFS_CID}/${tokenId}`
        );
        const jsonResponse = await data.json();
        setMetadata(jsonResponse);
      } catch (error) {
        console.log('There was an error fetching the metadata');
      }
      setLoadingMetadata(false);
    };
    if (tokenId) {
      fetchMetadata();
    } else {
      setLoadingMetadata(false);
    }
  }, [tokenId]);
  if (loadingMetadata || loading)
    return <p className='text-thewhite'>Loading </p>;
  if (!address)
    return (
      <div className='text-thewhite h-fullflex flex-col items-center justify-center'>
        <p>You need to login first.</p>
        <ConnectWallet />
      </div>
    );
  if (!metadata)
    return (
      <div className='text-thewhite h-fullflex flex-col items-center justify-center'>
        <p>It seems that you don&apos;t own an Anky yet.</p>
        <a>Buy one here: https://mint.anky.lat</a>
      </div>
    );

  return (
    <>
      <div className='text-thewhite w-full flex  flex-col justify-between items-center px-2'>
        <p>Welcome</p>
        <div className=' mx-auto mb-4'>
          <h2 className='text-3xl mb-2 '>{metadata.name}</h2>
          <div className='rounded-3xl overflow-hidden'>
            <MediaRenderer src={metadata.image} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
