import React, { useState } from 'react';

const World = () => {
  const [chosenPhase, setChosenPhase] = useState(null);
  var ankyStoryPhases = [
    {
      number: 1,
      mainTopic: 'Lost and Alone',
      description:
        'Anky finds himself lost and disconnected, not only from the world around him but from himself as well. He struggles to find a sense of security and stability.',
      color: 'EB0008',
      healingFocus: 'Grounding and Safety',
    },
    {
      number: 2,
      mainTopic: 'Creative Awakening',
      description:
        'Anky discovers a dormant passion for creation. His journey is now coloured with this newfound self-expression, but he must first understand and balance his desires and emotions.',
      color: 'F47704',
      healingFocus: 'Creativity and Desire',
    },
    {
      number: 3,
      mainTopic: 'Ego and Power',
      description:
        'Anky confronts his ego and the concept of personal power. His challenge here is to find balance between the ego-driven desire for control and the need for humility.',
      color: 'FBBC05',
      healingFocus: 'Power and Self-worth',
    },
    {
      number: 4,
      mainTopic: 'A Heart Unlocked',
      description:
        'Anky opens his heart and finds a well of compassion and love for himself and others. His challenge is to cultivate self-love and forgiveness, to heal wounds of the past.',
      color: '00A24F',
      healingFocus: 'Love and Forgiveness',
    },
    {
      number: 5,
      mainTopic: 'Speaking One’s Truth',
      description:
        'Anky learns the power of honest expression. He begins to communicate his feelings, thoughts, and ideas with authenticity and clarity.',
      color: '02ADEE',
      healingFocus: 'Communication and Authenticity',
    },
    {
      number: 6,
      mainTopic: 'Sight Unveiled',
      description:
        'Anky explores the depth of his intuition and inner wisdom. He must trust his inner voice and challenge his perception of the world around him.',
      color: '132A8D',
      healingFocus: 'Intuition and Insight',
    },
    {
      number: 7,
      mainTopic: 'Unity in Divinity',
      description:
        'Anky achieves a sense of connectedness and unity with all that is. He realizes that he is not separate from the world around him but an integral part of it.',
      color: '97067B',
      healingFocus: 'Connection and Enlightenment',
    },
  ];

  return (
    <div className='px-32 pt-32 flex h-screen'>
      <div className='flex flex-col h-fit w-96'>
        {ankyStoryPhases.map((x, i) => {
          return (
            <div
              key={i}
              style={{ backgroundColor: `#${x.color}` }}
              onClick={() => setChosenPhase(x)}
              className={`hover:cursor-pointer my-1 w-16 h-16 rounded-sm text-3xl flex items-center justify-center`}
            >
              {x.number}
            </div>
          );
        })}
      </div>
      <div className='text-thewhite w-96'>
        {chosenPhase ? (
          <div>
            <p className='text-bold'>{chosenPhase.healingFocus}</p>
            <p>{chosenPhase.mainTopic}</p>
            <p>{chosenPhase.description}</p>
          </div>
        ) : (
          <div>
            <h2 className=''>Phases of development</h2>
            <p>{}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default World;
