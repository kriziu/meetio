import styled from '@emotion/styled';
import { scrollY } from 'common/styles/scroll';

export const LikedContainer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;

  h1 {
    margin-bottom: 2rem;
  }

  ul {
    height: 74%;
    ${scrollY}
  }
`;
