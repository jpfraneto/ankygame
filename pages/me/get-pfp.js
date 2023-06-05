import React from 'react';
import GetPFPGame from '@component/components/GetPFPGame';
import { useAddress } from '@thirdweb-dev/react';

const GetPfpPage = () => {
  const address = useAddress();
  if (!address)
    return <p className='text-thewhite'>Please connect to the website.</p>;
  return <GetPFPGame userPrompt='tell me who you are' />;
};

export default GetPfpPage;
