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

export const DropDown = styled.div<{ x: number; y: number }>`
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  padding: 1rem;
  background-color: var(--color-gray-darker);
  border-radius: 2rem;
  position: absolute;
  z-index: 999;
  margin-top: 1rem;

  div {
    padding: 1rem;
    border-radius: 1.3rem;
  }

  div:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .active {
    background-color: var(--color-black);
  }
`;
