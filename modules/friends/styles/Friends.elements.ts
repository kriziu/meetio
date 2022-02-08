import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';
import { scrollY } from 'common/styles/scroll';
import { motion } from 'framer-motion';

export const SearchFriend = styled(Flex)`
  justify-content: space-between;
  position: relative;
  margin: 2rem 0;

  input {
    width: 73%;
  }

  svg {
    position: absolute;
    right: 31%;
    fill: var(--color-gray-dark);
  }

  button {
    width: 23%;
  }
`;

export const StyledUl = motion(styled.ul<{ height: number }>`
  height: ${({ height }) => `calc(${height}px - 22rem)`};
  ${scrollY}
`);
