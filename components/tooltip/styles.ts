import styled from '@emotion/styled';
import * as Tooltip from '@radix-ui/react-tooltip';

namespace StyledTooltip {
  export const Arrow = styled(Tooltip.Arrow)(({ theme }) => ({
    fill: theme.background,
  }));

  export const Content = styled(Tooltip.Content)(({ theme }) => ({
    a: {
      color: theme.foreground,
    },
    backgroundColor: theme.background,
    borderRadius: '4px',
    color: theme.foreground,
    fontSize: '12px',
    maxWidth: '256px',
    'p, pre': {
      color: theme.foreground,
    },
    padding: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
    pre: {
      fontWeight: 'bold',
    },
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    zIndex: 3,
  }));

  export const Portal = styled(Tooltip.Portal)();

  export const Provider = styled(Tooltip.Provider)();

  export const Root = styled(Tooltip.Root)();

  export const Trigger = styled(Tooltip.Trigger)({
    background: 'none',
    border: 0,
    outline: 0,
    padding: 0,
  });
}

export default StyledTooltip;
