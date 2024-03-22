// Optional, but recommended: run on the edge runtime.

import Prompts from '@/lib/constants/prompts';
import { NextResponse } from 'next/server';
import { OpenlayerClient } from 'openlayer';

// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const openlayer = new OpenlayerClient({
  openlayerApiKey: process.env.OPENLAYER_API_KEY!,
});

export const POST = async (request: Request): Promise<NextResponse<void>> => {
  const { chatCompletionLatency, latency, message, url } = await request.json();

  try {
    await openlayer.streamData(
      {
        chatCompletionLatency,
        latency,
        output: message,
        url,
      },
      {
        ...openlayer.defaultConfig,
        inputVariableNames: [],
        prompt: [{ content: Prompts.chat, role: 'system' }],
      },
      '2a6059de-eaf1-48fe-9a02-5771413c545e'
    );
  } catch (error) {
    console.error(error);
  }

  return new NextResponse();
};
