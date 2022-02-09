import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';

export const Center = styled(Flex)<{ height: number; visible: boolean }>`
  margin-top: 5rem;
  flex-direction: column;
  height: ${({ height }) => `calc(${height}px - 20rem)`};
  justify-content: flex-start;

  ${({ visible }) => !visible && 'pointer-events: none;'}

  h1 {
    margin-top: 2rem;
  }

  .buttons {
    width: 90%;
    max-width: 30rem;
    justify-content: space-around;
    margin-top: 1.5rem;

    button,
    a {
      text-align: center;
      width: 45%;
    }
  }

  .bottom {
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
  }
`;
