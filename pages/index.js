// LandingPage.js
import React from 'react';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();
  return (
    <>
      <p>aloja</p>
    </>
  );
};

export default LandingPage;

export async function getServerSideProps(context) {
  try {
    if (host.includes('anky')) {
      return {
        redirect: {
          destination: '/game',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {},
    };
  }
}
