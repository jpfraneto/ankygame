import React from 'react';
import Feed from '@component/components/timeline-feed/Feed';
import prisma from '@component/lib/prismaClient';

const FeedPage = ({ profiles }) => {
  return (
    <div>
      <Feed posts={profiles} />
    </div>
  );
};

export default FeedPage;

export async function getServerSideProps(context) {
  try {
    const profiles = await prisma.profile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
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
