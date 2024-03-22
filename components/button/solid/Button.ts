import StyleUtils from '@/lib/utils/style';
import styled from '@emotion/styled';

namespace Button {
  const Base = styled.button({
    ':disabled': {
      cursor: 'default',
      pointerEvents: 'none',
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '12px',
    margin: 0,
    outline: 0,
    padding: 0,
    transition: 'all ease-in-out',
    transitionDuration: '100ms',
    whiteSpace: 'nowrap',
  });

  export const Solid = styled(Base)(({ theme }) => ({
    ':disabled': {
      // TODO: disabled
    },
    backgroundColor: StyleUtils.hexToRgba(theme.foreground, 0.1),
    border: '1px solid',
    borderColor: StyleUtils.hexToRgba(theme.foreground, 0.1),
    borderRadius: '4px',
    color: theme.foreground,
    height: '24px',
    paddingLeft: '8px',
    paddingRight: '8px',
  }));
}

export default Button;
