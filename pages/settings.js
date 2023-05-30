import { useAddress } from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react';
import Button from '@component/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter();
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  useEffect(() => {
    getUserInfo();
  }, [address]);
  const getUserInfo = async () => {
    if (!address) return;
    const response = await fetch(`/api/user/${address}`);
    const data = await response.json();
    setUser(data.user);
    setUsername(data.user.username || '');
  };
  const updateUserInformation = async () => {
    setLoading(true);
    const response = await fetch(`/api/user/${address}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setLoading(false);
      setUpdated(true);
    } else {
      alert('Username is already taken!');
    }
  };
  if (!address || !user) return <p>Loading...</p>;
  return (
    <div className='bg-theblack h-screen w-screen text-center p-8'>
      <h2 className='text-6xl text-thewhite mb-4'>Settings</h2>
      <p className='text-thewhite'>{address}</p>
      <div className='relative w-48 h-48 border-thewhite border-2 md:w-80 md:h-80 rounded-full text-center mx-auto mb-4 overflow-hidden'>
        <Image src='/images/farza.png' fill alt='Anky as farza' />
      </div>
      <label className='text-thewhite'>
        Username
        <input
          type='text'
          className='px-2 ml-2 py-1 rounded text-theblack'
          placeholder='anon username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <div className='flex justify-center space-x-2 mt-4'>
        {!updated && (
          <Button
            buttonAction={updateUserInformation}
            buttonText='Update User Info'
            buttonColor='bg-thegreenbtn'
          />
        )}
        <Button
          buttonAction={() => router.push('/')}
          buttonText='Go Back'
          buttonColor='bg-theorange'
        />
      </div>
    </div>
  );
};

export default Settings;
