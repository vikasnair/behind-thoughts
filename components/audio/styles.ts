import styled from '@emotion/styled';

namespace StyledAudio {
  export const Root = styled.div<{ isMobile?: boolean }>(({ isMobile }) => ({
    right: isMobile ? '24px' : '48px',
    position: 'absolute',
    top: isMobile ? '24px' : '64px',
    zIndex: 1,
  }));
}

export default StyledAudio;
