import styled from '@emotion/styled';
import { Background } from 'common/components/Background';
import { Card } from 'common/components/Card';

export const CustomBackground = styled(Background)`
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);

  padding: 2rem;
  display: flex;
  flex-direction: column;

  .btn {
    justify-content: flex-end;
  }

  button {
    width: 8rem;
    margin-bottom: 2rem;
  }
`;

export const Comments = styled(Card)`
  flex: 1;
  overflow: hidden;
`;
