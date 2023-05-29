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
    <>
      <h2 className='text-4xl'>{user.twitterUsername}&apos;s runs</h2>
      {user.runs &&
        user.runs.map(run => (
          <div className='flex space-x-2' key={run.id}>
            <p>Time Spent: {run.timeSpent}</p>
            <p>Word Count: {run.wordCount}</p>
            <span
              onClick={() => {
                setChosenRun(run);
                setModalOpen(true);
              }}
            >
              Read
            </span>
          </div>
        ))}
      <Button buttonAction={() => router.push('/')} buttonText='Go Back' />
      {chosenRun && (
        <ReaderModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {chosenRun.content.split('\n').map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </ReaderModal>
      )}
    </>
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
