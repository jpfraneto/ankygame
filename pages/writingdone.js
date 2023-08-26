import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';
import LoggedInUser from '@component/components/LoggedInUser';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const rajdhani = Rajdhani({ weight: '400', subsets: ['devanagari'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>sadhana</title>
        <meta
          name='description'
          content='Deep Work timer and consistency trainer working alongside creators in challenges. '
        />
      </Head>
      <main className='bg-thewhite h-screen'>
        <LoggedInUser />
      </main>
    </>
  );
}
