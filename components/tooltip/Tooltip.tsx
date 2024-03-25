import { ReactNode } from 'react';
import StyledTooltip from './styles';

export type TooltipProps = {
  children: ReactNode;
  description: string | ReactNode;
};

const Tooltip = ({ children, description }: TooltipProps) => (
  <StyledTooltip.Provider>
    <StyledTooltip.Root>
      <StyledTooltip.Trigger>{children}</StyledTooltip.Trigger>

      <StyledTooltip.Portal>
        <StyledTooltip.Content
          collisionPadding={{
            bottom: 32,
            left: 32,
            right: 32,
            top: 32,
          }}
          sideOffset={4}>
          {description}

          <StyledTooltip.Arrow />
        </StyledTooltip.Content>
      </StyledTooltip.Portal>
    </StyledTooltip.Root>
  </StyledTooltip.Provider>
);

export default Tooltip;
