import React from 'react';

const backup = () => {
  const backupCharacters = async () => {
    const response = await fetch('/api/charactersbackup');
    console.log('fetched the api!');
  };
  return (
    <div>
      <button onClick={backupCharacters}>Backup</button>
    </div>
  );
};

export default backup;
