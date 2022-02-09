import styled from '@emotion/styled';
import { scrollY } from 'common/styles/scroll';
import { motion } from 'framer-motion';

export const StyledUl = motion(styled.ul<{ height: number }>`
  height: ${({ height }) => `calc(${height}px - 22rem)`};
  ${scrollY}
`);
