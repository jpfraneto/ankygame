import React from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import { useAddress } from '@thirdweb-dev/react';

const testing = () => {
  const address = useAddress();

  return (
    <div>
      <Web3Button
        contractAddress='0x4382D47Ee4645112451d451004134047dc45c0F5'
        action={async contract =>
          contract.call(
            'mintAnky',
            'https://ipfs.io/ipfs/QmWtzZ5atgDDsBtA1eZRULxcXSt7gDrjTBVAPZ2SpYPQwa'
          )
        }
      >
        Mint
      </Web3Button>
      <p>{address}</p>
    </div>
  );
};

export default testing;
