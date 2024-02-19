import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

/*
  This is the starting frame to begin the game

*/
const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'post',
      label: 'Start Learning',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/risklingo.png`,
    aspectRatio: '1.91:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/stakeFrame`,
});

export const metadata: Metadata = {
  title: 'Darian.xyz',
  description: 'LFG',
  openGraph: {
    title: 'Darian.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/risklingo.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>hello 123</h1>
    </>
  );
}