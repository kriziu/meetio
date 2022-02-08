import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';

export const NotificationInfo = styled(Flex)`
  justify-content: flex-start;

  div {
    margin-left: 0.7rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Buttons = styled(Flex)`
  margin-left: 0.7rem;
  margin-top: 1rem;
  max-width: 10rem;
  justify-content: space-between;
`;
