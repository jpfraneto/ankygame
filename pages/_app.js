import '@component/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>sadhana · the power of consistency</title>
        <meta name='description' content='Tell me who you are.' key='desc' />
        <meta
          property='og:description'
          content='Train your capacity for being present.'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
