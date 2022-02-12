import styled from '@emotion/styled';
import { scrollY } from 'common/styles/scroll';
import { motion } from 'framer-motion';

export const PostsContainer = motion(styled.div<{
  height: number;
  visible: boolean;
}>`
  height: ${({ height }) => height - 150}px;

  .icon {
    ${({ visible }) => !visible && 'margin-top: 2rem;'}
    flex-direction: column;
  }

  ul {
    margin-top: 4rem;
    margin-bottom: 2rem;
    height: ${({ height }) => height - 230}px;
    ${scrollY}
  }
`);
