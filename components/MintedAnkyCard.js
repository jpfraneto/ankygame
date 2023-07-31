import React, { useState, useEffect } from 'react';
import { MediaRenderer } from '@thirdweb-dev/react';
import {
  BsInstagram,
  BsWhatsapp,
  BsTiktok,
  BsYoutube,
  BsTwitter,
  BsTelegram,
} from 'react-icons/bs';
import { BiLogoTelegram } from 'react-icons/bi';
import { SiSubstack } from 'react-icons/si';

const MintedAnkyCard = ({ tokenId }) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socialsForDisplay, setSocialsForDisplay] = useState(false);
  const [socialsLink, setSocialsLink] = useState('');

  useEffect(() => {
    const fetchMetadata = async () => {
      const data = await fetch(
        `https://ipfs.thirdwebstorage.com/ipfs/${process.env.NEXT_PUBLIC_METADATA_IPFS_CID}/${tokenId}`
      );
      const jsonResponse = await data.json();
      setMetadata(jsonResponse);
      setLoading(false);
    };
    fetchMetadata();
  }, []);
  const socials = social => {
    switch (social) {
      case 'instagram':
        return setSocialsLink('https://www.instagram.com/papasiendopapa');
      case 'tiktok':
        return setSocialsLink('https://www.tiktok.com/@kithkui');
      case 'whatsapp':
        return setSocialsLink('https://wa.me/56985491126');
      case 'youtube':
        return setSocialsLink(
          'https://www.youtube.com/channel/UCsO2sX4NjuIOy8Yx0m5n02w'
        );
      case 'twitter':
        return setSocialsLink('https://www.twitter.com/kithkui');
      case 'substack':
        return setSocialsLink('https://jpfraneto.substack.com');
      case 'telegram':
        return setSocialsLink('https://t.me/jpfraneto');
    }
  };
  if (!metadata) return;
  if (loading) return <p className='text-gray-400'>loading...</p>;
  return (
    <div className='flex flex-col justify-around px-8 md:w-1/2 mx-auto mb-8'>
      <div className=' mx-auto mb-4'>
        <MediaRenderer src={metadata.image} />
      </div>
      <div className=' text-gray-400 px-4 mt-2'>
        <h2 className='text-3xl mb-2'>{metadata.name}</h2>
        <div>
          {metadata.description.split('\n').map((x, i) => {
            return (
              <p className='mb-2 text-sm' key={i}>
                {x}
              </p>
            );
          })}
        </div>
        <div className='mb-4'>
          <h2 className='text-3xl mb-2'>Traits:</h2>
          <div className='w-full flex flex-wrap justify-center'>
            {metadata.attributes.map((attribute, i) => {
              return (
                <div
                  key={i}
                  className='m-2 border-gray-400 px-2 py-1 rounded-xl border w-64'
                >
                  <div className='text-gray-300'>{attribute.trait_type}</div>
                  <div className='text-right'>
                    {attribute.display_type === 'date'
                      ? new Date(attribute.value * 1000).toLocaleDateString()
                      : attribute.display_type === 'number'
                      ? attribute.value
                      : attribute.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h1
          className='font-extrabold text-transparent my-4 text-4xl bg-clip-text'
          style={{
            background:
              'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet, white)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          welcome to the ankyverse
        </h1>
        <p>It is an honor to have you on board.</p>
        <p>The first sojourn (96 day cycle) starts Aug 10. Stay tuned.</p>
        <div className='flex justify-center space-x-4 mt-4'>
          <a
            target='_blank'
            onMouseEnter={() => {
              socials('instagram');
              setSocialsForDisplay(true);
            }}
            onMouseLeave={() => {
              setSocialsForDisplay(false);
            }}
            rel='noopener noreferrer'
            className='hover:opacity-70 text-gray-400'
            href='https://www.instagram.com/papasiendopapa'
          >
            <BsInstagram size={40} />
          </a>
          <a
            target='_blank'
            onMouseEnter={() => {
              socials('whatsapp');
              setSocialsForDisplay(true);
            }}
            onMouseLeave={() => {
              setSocialsForDisplay(false);
            }}
            rel='noopener noreferrer'
            className='hover:opacity-70 text-gray-400'
            href='https://wa.me/56985491126'
          >
            <BsWhatsapp size={40} />
          </a>
          <a
            target='_blank'
            onMouseEnter={() => {
              socials('telegram');
              setSocialsForDisplay(true);
            }}
            onMouseLeave={() => {
              setSocialsForDisplay(false);
            }}
            rel='noopener noreferrer'
            className='hover:opacity-70 text-gray-400'
            href='https://t.me/jpfraneto'
          >
            <BiLogoTelegram size={40} />
          </a>
          <a
            target='_blank'
            onMouseEnter={() => {
              socials('youtube');
              setSocialsForDisplay(true);
            }}
            onMouseLeave={() => {
              setSocialsForDisplay(false);
            }}
            rel='noopener noreferrer'
            className='hover:opacity-70 text-gray-400'
            href='https://www.youtube.com/channel/UCsO2sX4NjuIOy8Yx0m5n02w'
          >
            <BsYoutube size={40} />
          </a>
          <a
            target='_blank'
            onMouseEnter={() => {
              socials('twitter');
              setSocialsForDisplay(true);
            }}
            onMouseLeave={() => {
              setSocialsForDisplay(false);
            }}
            rel='noopener noreferrer'
            className='hover:opacity-70 text-gray-400'
            href='https://www.twitter.com/kithkui'
          >
            <BsTwitter size={40} />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            onMouseEnter={() => {
              socials('tiktok');
              setSocialsForDisplay(true);
            }}
            onMouseLeave={() => {
              setSocialsForDisplay(false);
            }}
            className='hover:opacity-70 text-gray-400'
            href='https://www.tiktok.com/@kithkui'
          >
            <BsTiktok size={40} />
          </a>
          <a
            target='_blank'
            onMouseEnter={() => {
              socials('substack');
              setSocialsForDisplay(true);
            }}
            onMouseLeave={() => {
              setSocialsForDisplay(false);
            }}
            rel='noopener noreferrer'
            className='hover:opacity-70 text-gray-400'
            href='https://jpfraneto.substack.com'
          >
            <SiSubstack size={40} />
          </a>
        </div>
        {setSocialsForDisplay && (
          <p className='text-center my-4 text-grey-400'>{socialsLink}</p>
        )}
        <hr className=' my-4 bg-gray-200 border-0 dark:bg-gray-700' />
        <small className='mt-4 '>
          All of this is in memory of David Foster Wallace and all of those that
          lost (or are losing) the fight against depression.
        </small>
        <br />
        <small>I&apos;m building for you.</small>
        <small>jp</small>
      </div>
    </div>
  );
};

export default MintedAnkyCard;
