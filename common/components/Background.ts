import styled from '@emotion/styled';

export const Background = styled.div<{
  w?: string;
  h?: string;
}>`
  background-color: rgba(0, 0, 0, 0.1);
  width: ${({ w }) => (w ? w : '100%')};
  height: ${({ h }) => (h ? h : '100%')};
  backdrop-filter: blur(2rem);
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;
