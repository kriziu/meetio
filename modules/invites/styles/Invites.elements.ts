import styled from '@emotion/styled';
import { scrollY } from 'common/styles/scroll';

export const InvitesContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `calc(${height}px - 10rem)`};

  h2 {
    margin-top: 1rem;
  }

  ul {
    height: 39%;

    ${scrollY}
  }
`;
