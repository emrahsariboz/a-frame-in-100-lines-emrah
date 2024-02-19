import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
// import { getFarcasterUserAddress } from '@coinbase/onchainkit/farcaster';

import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    console.log("Just clicked!");

    accountAddress = message.interactor.verified_accounts[0];
    console.log("The FID is", message.interactor.fid);
    console.log("The accountAddress is", accountAddress);
    // console.log("The address is: ", await getFarcasterUserAddress(message.interactor.fid))
  }

  if (message?.input) {
    text = message.input;
  }

  if (message?.button === 1) {
    console.log("Someone cliicked 1")
  }

  // if (message?.button === 3) {
  //   return NextResponse.redirect(
  //     'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
  //     { status: 302 },
  //   );
  // }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Story: ${text} 🌲🌲`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-1.png`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  console.log("Someone cliicked 1")
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
