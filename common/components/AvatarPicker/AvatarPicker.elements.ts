import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';
import { Card } from '../Card';

export const DarkBG = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const Container = styled(Card)`
  width: 30rem;

  label {
    margin: 1rem;
    cursor: pointer;
  }
`;

export const AvatarContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;

  button {
    margin-top: 1rem;
  }
`;
