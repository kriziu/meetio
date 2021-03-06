import styled from '@emotion/styled';

export const MainContainer = styled.div<{ shadow?: boolean; height: number }>`
  width: 100vw;
  height: ${({ height }) => height}px;
  position: absolute;
  top: 0;

  @media (min-width: 68.75rem) {
    width: 80vw;
    height: 70vh;
    position: relative;
    ${({ shadow }) => shadow && 'box-shadow: 0 0 10rem rgba(0, 0, 0, 0.5);'}
    border-radius: 5rem;
    overflow: hidden;
  }
  @media (min-width: 112.5rem) {
    width: 60vw;
    height: 70vh;
  }
`;
