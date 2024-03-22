import NetworkUtils from '@/lib/utils/network';
import { list, put } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

export const GET = async (request: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get('message');
  if (message === null) {
    return Promise.reject();
  }

  const fileName = NetworkUtils.encrypt(message);

  const { blobs } = await list({
    prefix: fileName,
  });

  const url = blobs.find((blob) =>
    blob.pathname.startsWith(fileName)
  )?.downloadUrl;

  return NextResponse.json({
    url,
  });
};

export const POST = async (request: Request): Promise<NextResponse> => {
  const { message, url } = await request.json();
  const fileName = NetworkUtils.encrypt(message);

  const file = await NetworkUtils.downloadImage(url, fileName);
  const blob = await put(file.name, file, {
    access: 'public',
  });

  return NextResponse.json(blob);
};
