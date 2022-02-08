import styled from '@emotion/styled';
import { Card } from 'common/components/Card';
import { Flex } from 'common/components/Flex';

export const StyledCard = styled(Card)`
  margin: 2rem 0;
`;

export const FriendInfo = styled(Flex)`
  justify-content: flex-start;

  h3 {
    margin-left: 0.7rem;
    width: 70%;
    text-align: left;
  }
`;

export const Buttons = styled(Flex)`
  margin-top: 1rem;
  max-width: 20rem;
  justify-content: space-between;

  a {
    width: 48%;
    text-align: center;
  }
`;
