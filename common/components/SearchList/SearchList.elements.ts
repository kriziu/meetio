import styled from '@emotion/styled';
import { Flex } from '../Flex';

export const SearchContainer = styled(Flex)`
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
