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
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import Button from '../button/Button';
import CopyButton from '../button/copy/CopyButton';
import StyledCommandBar from './styles';

const chatPrompt = `
Oblique strategies are a set of cards with a prompt on each one, designed to help artists get un-stuck. They were created by Brian Eno and Peter Schmidt.

Here are a few examples:
Use an old idea.
What would your closest friend do?
What to increase? What to reduce?
Try it in reverse.
Turn it upside down.

Your job is to create a new Oblique Strategy.

Restrict your input to only the strategy itself. For example, "Use an old idea."

The strategy should be absract enough, and open to interpretation, vague. It should not be too specific.

NEVER say "Try it in reverse."

Use quotation marks, and end the sentence with the appropriate punctuation.
`;

const imagePrompt = `
Oblique strategies are a set of cards with a prompt on each one, designed to help artists get un-stuck. They were created by Brian Eno and Peter Schmidt.

You are to create an image that represents an Oblique Strategy. The image should NOT have any text in it WHATSOEVER, and should NOT represent a card or deck or any other physical representation of the strategies.

The image should be artistic, meaningful, and unique. It should not look fake or computer-generated.

You should try an interesting style, such as abstract, surreal, or impressionistic. You can try it as a painting, or a drawing, or a photograph, or a collage, or any other style you like.

As much as possible, you should use people or animals or objects or places or things in the image, rather than abstract shapes or patterns or colors. Ideally depicting everyday scenes that relate to the strategy in some way, however distant.

The strategy you are to represent is:
`;

const CommandBar = () => {
  const router = useRouter();
  const { id } = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(MediaQuery.MobileScreen);

  const { message: _message, setMessage } = useMessage();
  const { generating, setGenerating } = useImageGenerating();
  const { imageUrl, setImageUrl } = useImageUrl();

  const { append, messages } = useChat({
    initialInput: chatPrompt,
    onFinish: ({ content }) => {
      setMessage(content);

      (async () => {
        try {
          const imageResponse = await fetch('/api/image', {
            body: JSON.stringify({
              prompt: imagePrompt + content,
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const imageCompletion = await imageResponse.json();

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
    } else {
      const defaultMessage = '"Try it in reverse."';
      setMessage(defaultMessage);
      fetchImage(defaultMessage);
    }
  }, [router.query]);

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

            append({
              content: chatPrompt + 'Generate a new unique Oblique Strategy.',
              role: 'user',
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

        <CopyButton>{`https://www.behindthoughts.com?id=${NetworkUtils.encrypt(message)}`}</CopyButton>

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
