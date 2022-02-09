import styled from '@emotion/styled';
import { scrollY } from 'common/styles/scroll';

export const InvitesContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `calc(${height}px - 10rem)`};

  ul {
    height: 40%;

    ${scrollY}
  }
`;
