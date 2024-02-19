import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';


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
    const fid = message.interactor.fid
    console.log("The FID is", fid);
    console.log("The message is", message);
    console.log("The custody address is:", message.interactor.custody_address);

    const url = `https://api.neynar.com/v1/farcaster/custody-address?fid=${fid}`;

    const options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json',
        api_key: 'NEYNAR_ONCHAIN_KIT',
        'content-type': 'application/json',
        onchainkit_version: '0.7.0',
      },
    };
    const resp = await fetch(options.url, options);
    if (resp.status !== 200) {
      throw (`non-200 status returned from neynar : ${resp.status}`);
    }

    console.log("The address is: ", resp.json())
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
