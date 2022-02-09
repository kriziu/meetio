import styled from '@emotion/styled';
import { Card } from 'common/components/Card';
import { Flex } from 'common/components/Flex';
import { motion } from 'framer-motion';

export const StyledCard = motion(styled(Card)`
  margin: 2rem 0;
`);

export const UserInfo = styled(Flex)`
  justify-content: flex-start;

  .info {
    margin-left: 0.7rem;
    width: 70%;

    * {
      text-align: left;
    }
  }
`;

export const Buttons = styled(Flex)`
  margin-top: 1rem;
  max-width: 20rem;
  justify-content: space-between;

  button {
    width: 48%;
    text-align: center;
  }
`;
