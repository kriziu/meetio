import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';

export const PageContainer = styled(Flex)`
  width: 100%;
  height: 85%;
  flex-direction: column;

  h1 {
    margin-bottom: 1rem;
  }

  div {
    width: 25rem;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }

  a {
    text-decoration: underline;
    font-weight: 500;
  }

  .gray {
    color: var(--color-gray-dark);
  }
`;
