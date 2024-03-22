import { useTheme } from '@emotion/react';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Button from '../Button';

type CopyButtonProps = {
  children: string;
};

const CopyButton = ({ children }: CopyButtonProps) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const Icon = copied ? CheckIcon : CopyIcon;

  const onClick = async () => {
    if (typeof navigator !== 'undefined' && navigator !== null) {
      try {
        await navigator.clipboard.writeText(children);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2500);
      } catch {}
    }
  };

  return (
    <Button.Base onClick={onClick} style={{ width: '70px' }}>
      <Icon color={theme.foreground} height='14' width='14' />

      {copied ? 'Copied' : 'Copy link'}
    </Button.Base>
  );
};

export default CopyButton;
