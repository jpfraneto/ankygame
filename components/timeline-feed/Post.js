import { useState } from 'react';
import Image from 'next/image';
import Button from '../Button';

const Post = ({ profile }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    // Check if the user has enough reading credits.
    // If they do, subtract the required amount and unlock the post.
    alert('You will need credits for this. How to win them? Just by writing.');
    setIsUnlocked(true);
  };

  const calculateCredits = writing => {
    const averageCharactersPerMinute = 200; // Estimated typing speed
    const charactersInWriting = writing.length;

    // calculate minutes spent on writing
    const minutesSpentOnWriting =
      charactersInWriting / averageCharactersPerMinute;

    // Assuming 1 minute of writing equates to 1 credit
    const creditsRequired = Math.ceil(minutesSpentOnWriting * 30); // Round up to the nearest integer

    return creditsRequired;
  };

  return (
    <div className='rounded overflow-hidden  w-full shadow-lg border-b-2 border-thewhite mb-0'>
      <div className='relative w-full aspect-square p-4 mt-0 mb-4 rounded-2xl overflow-hidden'>
        <Image src={profile.imageUrl} fill alt='image x' />
      </div>

      <div className='px-2 py-4 max-h-48 overflow-y-scroll text-thewhite'>
        <p>
          {isUnlocked
            ? profile.writing
            : profile.writing.substring(0, 60) + '...'}
        </p>
        {!isUnlocked && (
          <Button
            buttonText={`Unlock (${
              profile.timeSpent || calculateCredits(profile.writing)
            } credits)`}
            buttonAction={handleUnlock}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
