import React, { useEffect, useState } from 'react';

const Leaderboard = ({ leaderboard }) => {
  console.log('in the leaderboard component');

  if (!leaderboard) return <p>Loading...</p>;
  return (
    <table className='table-auto w-full'>
      <thead className='bg-thegreen border-thewhite text-theblack'>
        <tr>
          <th className='border border-thewhite px-4 py-1'>twitter</th>
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
            <td className='border px-4 py-1'>
              <a
                href={`https://www.twitter.com/${run.twitterUser}`}
                target='_blank'
                className='hover:text-thegreen'
                rel='noopener noreferrer'
              >
                @{run.twitterUser}
              </a>
            </td>
            <td className='border px-4 py-1'>{run.timeSpent}</td>
            <td className='border px-4 py-1'>{run.wordCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
