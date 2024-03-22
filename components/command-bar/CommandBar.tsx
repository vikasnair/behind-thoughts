import Prompts from '@/lib/constants/prompts';
import MediaQuery from '@/lib/enums/MediaQuery';
import useImageGenerating from '@/lib/hooks/useImageGenerating';
import useImageUrl from '@/lib/hooks/useImageUrl';
import useMediaQuery from '@/lib/hooks/useMediaQuery';
import useMessage from '@/lib/hooks/useMessage';
import NetworkUtils from '@/lib/utils/network';
import StyleUtils from '@/lib/utils/style';
import { useTheme } from '@emotion/react';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { useChat } from 'ai/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import Button from '../button/Button';
import CopyButton from '../button/copy/CopyButton';
import StyledCommandBar from './styles';

const CommandBar = () => {
  const router = useRouter();
  const { id } = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(MediaQuery.MobileScreen);

  const { message: _message, setMessage } = useMessage();
  const { generating, setGenerating } = useImageGenerating();
  const { imageUrl, setImageUrl } = useImageUrl();
  const [startTime, setStartTime] = useState(Date.now());

  const { append, messages } = useChat({
    initialInput: Prompts.chat,
    onFinish: ({ content }) => {
      const chatCompletionEndTime = Date.now();
      setMessage(content);

      (async () => {
        try {
          const imageResponse = await fetch('/api/image', {
            body: JSON.stringify({
              prompt: Prompts.image + content,
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const imageCompletion = await imageResponse.json();
          const endTime = Date.now();

          if (
            Array.isArray(imageCompletion.data) &&
            imageCompletion.data.length > 0 &&
            typeof imageCompletion.data[0].url === 'string'
          ) {
            const url = imageCompletion.data[0].url;
            setImageUrl(url);
            setGenerating(false);

            try {
              await fetch(`/api/storage`, {
                method: 'POST',
                body: JSON.stringify({
                  message: content,
                  url,
                }),
              });

              await fetch(`/api/openlayer`, {
                method: 'POST',
                body: JSON.stringify({
                  chatCompletionLatency: chatCompletionEndTime - startTime,
                  latency: endTime - startTime,
                  message: content,
                  url,
                }),
              });
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      })();
    },
  });

  const message = generating
    ? [...messages].reverse().find(({ role }) => role === 'assistant')
        ?.content ?? '...'
    : _message;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const fetchImage = async (message: string) => {
      const response = await fetch(`/api/storage?message=${message}`, {
        method: 'GET',
      });

      const json = await response.json();
      if (typeof json.url === 'string') {
        setImageUrl(json.url);
      }
    };

    if (typeof id === 'string' && id.length > 0) {
      const decrypted = NetworkUtils.decrypt(id);
      setMessage(decrypted);
      fetchImage(decrypted);
    } else if (message.length === 0) {
      const defaultMessage = '"Try it in reverse."';
      setMessage(defaultMessage);
      fetchImage(defaultMessage);
    }
  }, [router.isReady, router.query]);

  return (
    <StyledCommandBar.Root>
      {!isMobile && (
        <StyledCommandBar.Group>
          <StyledCommandBar.Title>Behind thoughts</StyledCommandBar.Title>
        </StyledCommandBar.Group>
      )}

      {!isMobile && (
        <StyledCommandBar.Group>
          <StyledCommandBar.Thought>
            {message.length > 0 ? `"${message.replaceAll('"', '')}"` : ''}
          </StyledCommandBar.Thought>
        </StyledCommandBar.Group>
      )}

      <StyledCommandBar.Group>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setGenerating(true);
            setStartTime(Date.now());

            append({
              content: Prompts.chat + 'Generate a new unique Oblique Strategy.',
              role: 'system',
            });
          }}>
          <Button.Solid disabled={generating} type='submit'>
            {generating && (
              <ColorRing
                ariaLabel='mutating-dots-loading'
                colors={[
                  theme.foreground,
                  StyleUtils.hexToRgba(theme.foreground, 0.99),
                  StyleUtils.hexToRgba(theme.foreground, 0.98),
                  StyleUtils.hexToRgba(theme.foreground, 0.97),
                  StyleUtils.hexToRgba(theme.foreground, 0.96),
                ]}
                height='18'
                visible={true}
                width='18'
                wrapperStyle={{}}
                wrapperClass=''
              />
            )}
            {generating ? 'Generating' : 'Generate'}
          </Button.Solid>
        </form>

        <CopyButton>{`https://www.behindthoughts.com/${NetworkUtils.encrypt(message)}`}</CopyButton>

        {imageUrl.length > 0 && (
          <Link href={imageUrl} target={'_blank'}>
            <Button.Base>
              <ExternalLinkIcon
                color={theme.foreground}
                height='14'
                width='14'
              />
              View image
            </Button.Base>
          </Link>
        )}
      </StyledCommandBar.Group>
    </StyledCommandBar.Root>
  );
};

export default CommandBar;
