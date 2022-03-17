import styled from '@emotion/styled';
import { scrollY } from 'common/styles/scroll';

export const ForYouContainer = styled.div<{ height: number }>`
  h1 {
    margin-bottom: 2rem;
  }

  ul {
    ${scrollY}
    height: ${({ height }) => height - 150}px;
  }
`;
