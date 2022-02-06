import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';

export const FriendInfo = styled(Flex)`
  justify-content: flex-start;

  h3 {
    margin-left: 0.7rem;
  }
`;

export const Buttons = styled(Flex)`
  margin-top: 1rem;
  max-width: 20rem;
  justify-content: space-between;

  button {
    width: 48%;
  }
`;
