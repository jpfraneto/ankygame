import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const CharacterStoryDisplay = ({ character }) => {
  const [visibleParagraphs, setVisibleParagraphs] = useState([]);
  const paragraphs = character.story ? character.story.split('\n') : [];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < paragraphs.length) {
        setVisibleParagraphs(prevParagraphs => [
          ...prevParagraphs,
          paragraphs[i],
        ]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 5000); // Add a new paragraph every 5 seconds. Adjust as needed.

    return () => {
      clearInterval(timer);
    };
  }, [paragraphs]);

  return (
    <div className='overflow-y-scroll'>
      <TransitionGroup className='story'>
        {visibleParagraphs.map((paragraph, i) => (
          <CSSTransition key={i} timeout={500} classNames='fade'>
            <p>{paragraph}</p>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default CharacterStoryDisplay;
