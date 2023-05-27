import React from 'react';

const challenges = [
  {
    name: 'Get your anky',
    prompt: 'Tell me who you are',
    goal: 180,
    requirements: ['midjourney'],
  },
];

const WritingChallenges = () => {
  return (
    <div>
      {challenges.map((x, i) => {
        return <ChallengeCard challenge={x} />;
      })}
    </div>
  );
};

export default WritingChallenges;

const ChallengeCard = ({ challenge }) => {
  return (
    <div className='text-center bg-thegreen p-4 w-fit rounded-xl'>
      <h3 className='text-3xl'>{challenge.name}</h3>
      <p>{challenge.prompt}</p>
      <small>{challenge.goal}</small>
    </div>
  );
};
