import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '@component/components/Button';
import ReaderModal from '@component/components/ReaderModal';
import { useAddress } from '@thirdweb-dev/react';
import Image from 'next/image';

function MePage({}) {
  const address = useAddress();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [chosenRun, setChosenRun] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/user/${address}`);
      const data = await response.json();
      setUser(data.user);
    };
    if (address) fetchUserData();
  }, [address]);
  // check if router is ready before using its params

  if (!address) return <p>Log in to be here</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className='bg-theblack text-thewhite h-screen w-screen overflow-scroll py-12'>
      <div className='relative border-thewhite border-2 w-48 h-48 rounded-xl overflow-hidden mx-auto'>
        {user.image ? (
          <Image src={user.image} alt='The image for this user' fill />
        ) : (
          <>
            <Image src='/images/anky.png' fill alt='This is Anky' />
          </>
        )}
      </div>
      {!user.image && (
        <small className='text-center block'>
          You don&apos;t have your custom image yet.
          <span
            className='hover:cursor-pointer '
            onClick={() =>
              router.push('/me/get-pfp', undefined, { shallow: true })
            }
          >
            {' '}
            Click here to get it.
          </span>
        </small>
      )}

      {/* <h2 className='text-4xl text-center'>Your runs</h2>
      {user.runs &&
        user.runs.map(run => (
          <div
            className='flex space-x-2 items-center mb-2 justify-center'
            key={run.id}
          >
            <p>Time Spent: {run.timeSpent}</p>
            <p>Word Count: {run.wordCount}</p>
            <Button
              buttonAction={() => {
                setChosenRun(run);
                setModalOpen(true);
              }}
              buttonText='Read'
            />
          </div>
        ))} */}
      {/* <div className='flex justify-center '>
        <Button
          buttonAction={() => router.push('/')}
          buttonText='Go Back'
          buttonColor='bg-thegreenbtn'
        />
      </div> */}
      {chosenRun && (
        <ReaderModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {chosenRun.content.split('\n').map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </ReaderModal>
      )}
    </div>
  );
}

export default MePage;
