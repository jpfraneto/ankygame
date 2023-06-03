import React from 'react';
import Feed from '@component/components/timeline-feed/Feed';
import prisma from '@component/lib/prismaClient';

const FeedPage = ({ profiles }) => {
  const posts = [
    {
      image: '/ankys/1.png',
      title: 'Title 1',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). ",
    },
    {
      image: '/ankys/2.png',
      title: 'Title 2',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). ",
    },
  ];
  return (
    <div>
      <Feed posts={profiles} />
    </div>
  );
};

export default FeedPage;

export async function getServerSideProps(context) {
  try {
    const profiles = await prisma.profile.findMany();
    console.log('the profiles are: ', profiles);
    return {
      props: { profiles: JSON.parse(JSON.stringify(profiles)) },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {},
    };
  }
}
