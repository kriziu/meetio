import styled from '@emotion/styled';
import { scrollY } from 'common/styles/scroll';

export const FollowersContainer = styled.div<{ height: number; me: boolean }>`
  height: ${({ height }) => `calc(${height}px - 10rem)`};

  h2 {
    margin-top: 1rem;
  }

  ul {
    height: ${({ me }) => (me ? 39 : 80)}%;

    ${scrollY}
  }
`;
