import Audio from '@/components/audio/Audio';
import CommandBar from '@/components/command-bar/CommandBar';
import MediaQuery from '@/lib/enums/MediaQuery';
import useImageGenerating from '@/lib/hooks/useImageGenerating';
import useImageUrl from '@/lib/hooks/useImageUrl';
import useMediaQuery from '@/lib/hooks/useMediaQuery';
import useMessage from '@/lib/hooks/useMessage';
import Head from 'next/head';
import StyledHome from './styles';

const Home = () => {
  const isMobile = useMediaQuery(MediaQuery.MobileScreen);
  const { message } = useMessage();
  const { generating } = useImageGenerating();
  const { imageUrl } = useImageUrl();

  return (
    <>
      <Head>
        <title>Behind thoughts</title>

        <meta
          content="Generate ideas for getting un-stuck a la Brian Eno's Oblique Strategies, using GPT"
          name='description'
        />

        <meta content='width=device-width, initial-scale=1' name='viewport' />

        <link href='/favicon.ico' rel='icon' />
      </Head>

      <CommandBar />

      <Audio />

      <StyledHome.Root
        style={{
          backgroundImage: imageUrl.length > 0 ? `url(${imageUrl})` : undefined,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}></StyledHome.Root>

      <StyledHome.Subtitle>
        {isMobile
          ? message.length > 0
            ? `"${message.replaceAll('"', '')}"`
            : ''
          : generating
            ? 'Generating...'
            : imageUrl.length > 0
              ? ''
              : ''}
      </StyledHome.Subtitle>
    </>
  );
};

export default Home;
