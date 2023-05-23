import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import Link from 'next/link';

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
      <main className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen overflow-scroll'>
        <section className='hero pb-10 px-5 text-center text-white overflow-scroll'>
          <h4
            className={`${russo.className} text-2xl md:text-5xl w-full font-bold`}
          >
            It seems you are lost. Do you need some help?{' '}
            <Link href='/'>go back.</Link>
          </h4>
        </section>
      </main>
    </>
  );
}
