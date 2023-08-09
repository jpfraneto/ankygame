import React, { useState, useRef, useEffect } from 'react';

const Calendar = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleMouseEnter = day => {
    setModalContent(day);
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  const kingdoms = [
    'Primordia',
    'Emblazion',
    'Chryseos',
    'Eleasis',
    'Voxlumis',
    'Insightia',
    'Claridium',
    'Poiesis',
  ];

  const festivals = {
    1: {
      name: 'Survival Day',
      emoji: '💪',
      description: 'Endurance and strength competitions.',
    },
    9: {
      name: "Ancestor's Day",
      emoji: '👴',
      description: 'Dedicated to paying homage to ancestors.',
    },
    17: {
      name: 'Hunt and Gather Day',
      emoji: '🏹',
      description:
        'Participants learn about ancient methods of hunting and foraging.',
    },
    2: {
      name: 'Festival of Lights',
      emoji: '🏮',
      description: 'Celebrating the fire within with lanterns and bonfires.',
    },
    18: {
      name: 'Passion Play',
      emoji: '🎭',
      description: 'A theatre festival.',
    },
    34: {
      name: 'Emotion Day',
      emoji: '❤️',
      description: 'A day of expressing and acknowledging emotions.',
    },
    3: {
      name: 'Transformation Festival',
      emoji: '🦋',
      description: 'Celebrating personal growth and change with costumes.',
    },
    27: {
      name: 'Golden Gala',
      emoji: '🍲',
      description:
        'A grand gathering and feast, where life is celebrated with heart-cooked food.',
    },
    51: {
      name: 'Alchemy Day',
      emoji: '⚗️',
      description:
        'Participants engage in transformational activities or tasks.',
    },
    4: {
      name: "Love's Bloom",
      emoji: '🌸',
      description: 'A festival celebrating love.',
    },
    36: {
      name: 'Renewal Day',
      emoji: '🔄',
      description: 'A day to renew vows and relationships.',
    },
    68: {
      name: 'Heart Opening Day',
      emoji: '💖',
      description: 'People perform acts of kindness or love.',
    },
    5: {
      name: 'Word Weaving Day',
      emoji: '📚',
      description: 'A celebration of storytelling, people share tales.',
    },
    45: {
      name: 'Songbird Festival',
      emoji: '🎵',
      description: 'Honoring the magic through the composition of music.',
    },
    77: {
      name: 'Echo Day',
      emoji: '🔊',
      description: 'Debates and dialogues take place, seeking understanding.',
    },
    6: {
      name: 'Moon Meditation Night',
      emoji: '🌜',
      description: 'A full night dedicated to meditation under moonlight.',
    },
    54: {
      name: 'Prophecy Day',
      emoji: '🔮',
      description: 'A day of prophetic readings and interpretations.',
    },
    86: {
      name: 'Dream Weaver Day',
      emoji: '💭',
      description: 'People share and discuss their dreams and aspirations.',
    },
    7: {
      name: "The Spirit's Symposium",
      emoji: '👥',
      description: 'A gathering for spiritual discourses.',
    },
    63: {
      name: 'The Enlightenment Eve',
      emoji: '✨',
      description:
        'A night for introspection and exploration of consciousness.',
    },
    95: {
      name: 'Day of Silence',
      emoji: '🤫',
      description:
        'For deep introspection and fostering mindfulness. A day of silence.',
    },
    8: {
      name: 'Imagination Illumination',
      emoji: '🎆',
      description: 'A festival of light and creativity with LED lanterns.',
    },
    72: {
      name: 'The White Mas',
      emoji: '🎨',
      description:
        'A festival where everyone paints and gets painted. A celebration of color.',
    },
  };

  const calendarData = Array.from({ length: 96 }, (_, i) => {
    const kingdom = kingdoms[i % 8];
    const festival = festivals[i + 1];
    return {
      day: i + 1,
      kingdom,
      festival: festival
        ? {
            name: festival.name,
            emoji: festival.emoji,
            description: festival.description,
          }
        : null,
    };
  });

  return (
    <div
      className='text-theblack relative flex md:flex-row flex-col bg-thewhite overflow-y-scroll w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
      }}
    >
      <div className='h-fit md:h-full  w-screen md:w-96 overflow-y-scroll px-9 pt-6'>
        <h2 className={` text-3xl  `}>Calendar</h2>
        <p className={`mt-7 text-md `}>Each sojourn lasts for 96 winks.</p>
        <p className={`mt-7 text-md `}>One wink is a human day.</p>
        <p className={`mt-7 text-md `}>
          Each wink, the energy of a specific kingdom is active.
        </p>
        <p className={`mt-7 text-md `}>
          Each kingdom with its unique celebrations, which you are encouraged to
          celebrate in your local community.
        </p>
        {showModal && (
          <div
            className={`${
              modalContent.kingdom.toLowerCase() === 'poiesis' &&
              'text-theblack'
            } bg-${modalContent.kingdom.toLowerCase()} w-full px-2 h-full flex flex-col py-4 items-center justify-center bg-black rounded`}
          >
            <h3 className='text-2xl font-semibold mb-4'>
              Day {modalContent.day}
            </h3>
            <p className='mb-2'>Kingdom: {modalContent.kingdom}</p>
            {modalContent.festival && (
              <div>
                <p className='text-green-500 font-semibold'>
                  Festival: {modalContent.festival.name}
                </p>
                <p className='text-green-500 font-semibold'>
                  {modalContent.festival.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className='grid grid-cols-8 gap-4'>
        {kingdoms.map((kingdom, index) => {
          return (
            <div
              key={index}
              className={`day ${
                kingdom.toLowerCase() === 'poiesis' && 'text-theblack'
              } bg-${kingdom.toLowerCase()} hover:cursor-pointer p-1 rounded hover:bg-opacity-40 transition-all bg-opacity-70 duration-200 ease-in-out`}
            >
              {kingdom}
            </div>
          );
        })}
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={`day ${
              day.kingdom.toLowerCase() === 'poiesis' && 'text-theblack'
            } bg-${day.kingdom.toLowerCase()} hover:cursor-pointer text-xl p-1 rounded hover:bg-opacity-80 transition-all duration-200 ease-in-out`}
            onMouseEnter={() => handleMouseEnter(day)}
            onMouseLeave={handleMouseLeave}
          >
            {day.day}{' '}
            {day.festival && (
              <span className='emoji text-lg'>{day.festival.emoji}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
