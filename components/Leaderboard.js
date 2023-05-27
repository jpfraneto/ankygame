import React, { useEffect, useState } from 'react';

const Leaderboard = ({ setSelectedRun, setModalOpen }) => {
  const [leaderboard, setLeaderboard] = useState(null);
  useEffect(() => {
    const loadLeaderboard = async () => {
      fetch('/api/runs')
        .then(res => res.json())
        .then(data => {
          console.log('the data is: ', data);
          setLeaderboard(data);
          setLoadingLeaderboard(false);
        })
        .catch(err => console.error(err));
    };

    loadLeaderboard();
  }, []);
  if (!leaderboard) return <p>Loading...</p>;
  return (
    <table className='table-auto w-full max-h-[100vh - 300px] overflow-x-scroll'>
      <thead className='bg-thegreen border-thewhite text-theblack'>
        <tr>
          <th className='border border-thewhite px-4 py-1'>Username</th>
          <th className='border border-thewhite px-4 py-1'>Time spent</th>
          <th className='border border-thewhite px-4 py-1'>Word count</th>
        </tr>
      </thead>
      <tbody className='border-thewhite'>
        {leaderboard.map((run, index) => (
          <tr
            key={index}
            className={
              index % 2 === 0
                ? 'bg-thered bg-opacity-70'
                : 'bg-thered bg-opacity-40'
            }
          >
            <td className='border px-4 py-1'>@{run.twitterUser}</td>
            <td className='border px-4 py-1'>{run.timeSpent}</td>
            <td className='border px-4 py-1'>{run.wordCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
