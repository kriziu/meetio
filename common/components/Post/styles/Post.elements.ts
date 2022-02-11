import styled from '@emotion/styled';
import { Card } from 'common/components/Card';
import { Flex } from 'common/components/Flex';
import { scrollY } from 'common/styles/scroll';

export const PostContainer = styled(Card)<{ inDetails?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  ${({ inDetails }) => inDetails && 'max-height: 100%;'};
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

export const PostContent = styled.p<{
  inDetails?: boolean;
  setAllContent?: boolean;
}>`
  ${({ inDetails }) => !inDetails && 'max-height: 25rem;'}
  transition: all .2s;
  height: 100%;
  overflow: hidden;
  ${({ setAllContent }) => setAllContent && scrollY}
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
    cursor: pointer;

    svg {
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }
  }
`;
