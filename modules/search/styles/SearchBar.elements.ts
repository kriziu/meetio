import styled from '@emotion/styled';

export const TopContainer = styled.div`
  position: absolute;
  width: 70vw;
  margin-left: calc(50% - 5rem);
  top: 2.5rem;
  transform: translateX(-50%);
  z-index: 9;

  svg {
    position: absolute;
    right: 1.5rem;
    top: 0.8rem;
    fill: var(--color-gray-dark);
  }
`;
