// LandingPage.js
import React from 'react';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();
  return (
    <div
      className='text-thewhite relative min-h-screen flex items-center overflow-y-scroll py-16 justify-center w-full bg-cover bg-center'
      style={{
        boxSizing: 'border-box',
        height: 'calc(100vh  - 30px)',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
      }}
    >
      <div className='max-w-5/12 mx-auto'>
        <p>
          This is a game designed to take the user into a journey. The journey
          towards a deeper understanding of herself, and the relationship with
          her experience as a human being.
        </p>
        <p>
          It is divided in 7 phases, or stages, each one of them connecting with
          one aspect of the human experience.
        </p>
      </div>
    </div>
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
