import styled from '@emotion/styled';
import { Card } from 'common/components/Card';
import { Flex } from 'common/components/Flex';

export const PostContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  /* position: absolute;
  top: 0; */
`;

export const PostAuthor = styled(Flex)`
  width: 100%;
  justify-content: flex-start;

  div {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PostContent = styled.p`
  max-height: 25rem;
  overflow: hidden;
  font-weight: 400;
  margin-top: 1rem;
`;

export const PostDetails = styled(Flex)<{ liked?: boolean }>`
  justify-content: flex-start;
  height: 3rem;

  .heart svg {
    ${({ liked }) => liked && 'fill: var(--color-red);'}
  }

  span {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    font-weight: 500;

    svg {
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }
  }
`;
