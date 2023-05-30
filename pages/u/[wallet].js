import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@component/components/Button';
import prisma from '@component/lib/prismaClient';
import ReaderModal from '@component/components/ReaderModal';

function UserByWallet({ user, runs }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [chosenRun, setChosenRun] = useState(null);

  // check if router is ready before using its params
  if (!router.isReady) return null;

  if (!user) return;

  return (
    <div className='bg-theblack text-thewhite h-screen w-screen overflow-scroll py-12'>
      <h2 className='text-4xl text-center'>Your runs</h2>
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
        ))}
      <div className='flex justify-center '>
        <Button
          buttonAction={() => router.push('/')}
          buttonText='Go Back'
          buttonColor='bg-thegreenbtn'
        />
      </div>
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

export async function getServerSideProps(context) {
  const { wallet } = context.params;

  // Fetch the user and their runs from the database
  const user = await prisma.user.findUnique({
    where: { walletAddress: wallet },
    include: { runs: true },
  });

  // If user does not exist, return 404
  if (!user) {
    return {
      notFound: true,
    };
  }

  // Pass the user and their runs to the page
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default UserByWallet;
