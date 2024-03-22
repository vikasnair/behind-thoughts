import useImageGenerating from '@/lib/hooks/useImageGenerating';
import useImageUrl from '@/lib/hooks/useImageUrl';
import { useChat } from 'ai/react';
import Button from '../button/solid/Button';
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

Use quotation marks, and end the sentence with the appropriate punctuation.
`;

const imagePrompt = `
Oblique strategies are a set of cards with a prompt on each one, designed to help artists get un-stuck. They were created by Brian Eno and Peter Schmidt.

You are to create an image that represents the following Oblique Strategy:
`;

const CommandBar = () => {
  const { generating, setGenerating } = useImageGenerating();
  const { setImageUrl } = useImageUrl();

  const { append, messages } = useChat({
    initialInput: chatPrompt,
    onFinish: ({ content }) => {
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
            setImageUrl(imageCompletion.data[0].url);
            setGenerating(false);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    },
  });

  const message =
    [...messages].reverse().find(({ role }) => role === 'assistant')?.content ??
    '"Try it in reverse."';

  return (
    <StyledCommandBar.Root>
      <StyledCommandBar.Group>
        <StyledCommandBar.Title>Behind thoughts</StyledCommandBar.Title>
      </StyledCommandBar.Group>

      <StyledCommandBar.Group>
        <StyledCommandBar.Thought>
          "{message.replaceAll('"', '')}"
        </StyledCommandBar.Thought>
      </StyledCommandBar.Group>

      <StyledCommandBar.Group>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setGenerating(true);

            append({
              content: 'Generate a new unique Oblique Strategy.',
              role: 'user',
            });
          }}>
          <Button.Solid type='submit'>Generate</Button.Solid>
        </form>
      </StyledCommandBar.Group>
    </StyledCommandBar.Root>
  );
};

export default CommandBar;
