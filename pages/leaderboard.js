import React, { useState, useEffect } from 'react';
import Leaderboard from '@component/components/Leaderboard';
const leaderboard = () => {
  console.log('the leaderboard is: ', leaderboard);
  return (
    <div className='flex flex-col gap-2 min-h-screen w-full items-center justify-center'>
      <Leaderboard />
    </div>
  );
};

export default leaderboard;
