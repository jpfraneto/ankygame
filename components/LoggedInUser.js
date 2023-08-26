import React, { useEffect, useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import Button from './Button';

const LoggedInUser = ({ copyWriting }) => {
  const { user, logout } = usePrivy();
  const [getAnkyProcess, setGetAnkyProcess] = useState(false);
  const [baseActive, setBaseActive] = useState(false);
  const [userWallet, setUserWallet] = useState(null);
  const wallets = useWallets();
  console.log('the wallets are', wallets);
  const wallet = wallets.wallets[0];
  const changeChain = async () => {
    console.log('in here');
    if (wallet) {
      await wallet.switchChain(8453);
      setBaseActive(true);
      setUserWallet(wallet);
      console.log('the chain was changed');
    }
  };
  useEffect(() => {
    changeChain();
  }, [wallet]);

  const getMyAnky = async () => {
    alert(
      'Now is when the anky should be minted to the address of the user, so that it can store all of the writings as NFTs'
    );
  };

  return (
    <div className='z-50'>
      {getAnkyProcess ? (
        <div>
          <p>Time to get your anky in the following wallet.</p>
          <p>{userWallet.address}</p>
          <p>The problem is: Where do I get $ for paying for the gas?</p>
          <p>
            What I would love to happen: You mint your Anky and this first
            writing is minted as an NFT inside there.{' '}
          </p>
          <p>
            The problem is: Will the user pay for the gas fees every day? That
            is 0.12 usd. Per month, it is 3.6 usd.
          </p>
          <p>I can tell the user to get eth on his wallet.</p>
          <p>
            I could mint a specific NFT (and charge for it with crossmint) and
            then send the money to the user right away.
          </p>
          <p>How to fund the users wallet easily?</p>
          <p>Which is the flow that wants to happen here?</p>
          <p>
            I need a system for allowing the user to pay with credit card, and
            with that transaction, to get $ in his wallet (in the form of
            coins). There will be 3 kinds of coins, each one representing a
            different amount of money. There will also be a coin that just
            represents time. You earn it by coming here to write, and each time
            that you mint a writing NFT you end up with more of it.
          </p>
          <p>
            Take the user on a journey. Each user will cost me 0.12 usd. If
            there are 300 users, that is 36 usd. It is a price that i am willing
            to pay in order to give them a cool experience.
          </p>

          <div className='flex justify-center space-x-2'>
            <Button
              buttonAction={copyWriting}
              buttonText='Copy my writing'
              buttonColor='bg-thepurple'
            />
            <Button buttonAction={getMyAnky} buttonText='Mint Anky' />
            <Button
              buttonAction={() =>
                alert(
                  'This button should display a modal for the user to buy crypto right away and have it on their wallet'
                )
              }
              buttonColor='bg-thegreenbtn'
              buttonText='Add eth to wallet'
            />
            <Button
              buttonAction={logout}
              buttonText='Log Out'
              buttonColor='bg-theredbtn'
            />{' '}
          </div>
        </div>
      ) : (
        <>
          {baseActive && <p>You are logged in</p>}
          <div className='flex justify-center space-x-2'>
            <Button
              buttonAction={() => setGetAnkyProcess(true)}
              buttonText='Get My Anky'
              buttonColor='bg-insightia'
            />
            <Button
              buttonAction={logout}
              buttonText='Log Out'
              buttonColor='bg-theredbtn'
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LoggedInUser;
