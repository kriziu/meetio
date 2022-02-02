import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';

export const Center = styled(Flex)`
  margin-top: 5rem;
  flex-direction: column;

  h1 {
    margin-top: 2rem;
  }

  .buttons {
    width: 90%;
    max-width: 30rem;
    justify-content: space-around;
    margin-top: 1.5rem;

    button {
      width: 45%;
    }
  }

  .bottom {
    position: absolute;
    flex-direction: column;
    bottom: 5rem;
  }
`;
