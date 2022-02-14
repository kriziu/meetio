import styled from '@emotion/styled';
import { notificationDot } from 'common/styles/notificationDot';
import { scrollY } from 'common/styles/scroll';
import { motion } from 'framer-motion';

export const StyledUl = motion(styled.ul<{ height: number }>`
  height: ${({ height }) => `calc(${height}px - 22rem)`};
  ${scrollY}
`);

export const InvitesContainer = styled.div<{ notify?: boolean }>`
  text-align: center;
  a {
    ${({ notify }) => notificationDot(-3, -8, notify)}
  }
`;
