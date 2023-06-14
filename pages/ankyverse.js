import AnkyverseComponent from '@component/components/AnkyverseComponent';
import React, { useState } from 'react';

const Ankyverse = () => {
  const [chosenPhase, setChosenPhase] = useState(null);

  return <AnkyverseComponent />;
};

export default Ankyverse;
