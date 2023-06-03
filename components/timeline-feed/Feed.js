import React from 'react';
import Post from './Post';

const Feed = ({ posts }) => {
  return (
    <div
      className='grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 place-items-center mx-auto '
      style={{ maxWidth: '400px' }}
    >
      {posts.map((post, index) => (
        <Post key={index} profile={post} />
      ))}
    </div>
  );
};

export default Feed;
