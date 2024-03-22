import StyleUtils from '@/lib/utils/style';
import styled from '@emotion/styled';

namespace StyledCommandBar {
  export const Root = styled.div(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: StyleUtils.hexToRgba(theme.background, 0.9),
    border: '1px solid',
    borderColor: StyleUtils.hexToRgba(theme.foreground, 0.1),
    borderRadius: '24px',
    boxSizing: 'border-box',
    display: 'flex',
    height: '48px',
    left: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '4px',
    paddingRight: '4px',
    position: 'absolute',
    top: '48px',
    right: 0,
    // transform: 'translate(-50%,0)',
    transition: 'all ease-in-out',
    transitionDuration: '100ms',
    width: 'fit-content',
    zIndex: 2,
  }));

  export const Group = styled.div(({ theme }) => ({
    ':not(:last-child)': {
      borderRight: '1px solid',
      borderRightColor: StyleUtils.hexToRgba(theme.foreground, 0.1),
    },
    alignItems: 'center',
    columnGap: '12px',
    display: 'flex',
    height: '24px',
    paddingLeft: '12px',
    paddingRight: '12px',
  }));

  export const Thought = styled.h2(({ theme }) => ({
    color: theme.foreground,
    fontSize: '14px',
    fontWeight: 'normal',
  }));

  export const Title = styled.h1(({ theme }) => ({
    color: StyleUtils.hexToRgba(theme.foreground, 0.5),
    fontSize: '14px',
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
  }));
}

export default StyledCommandBar;
