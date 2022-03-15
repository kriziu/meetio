import styled from '@emotion/styled';
import { Background } from 'common/components/Background';
import { Card } from 'common/components/Card';
import { scrollY } from 'common/styles/scroll';
import { motion } from 'framer-motion';

export const PostContainer = motion(styled.div`
  max-height: 25rem;
  margin-bottom: 2rem;
  max-height: 80vh;
`);

export const CustomBackground = motion(styled(Background)<{ height: number }>`
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  height: ${({ height }) => height}px;

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
`);

export const Comments = styled(Card)`
  flex: 1;
  overflow: hidden;
  position: relative;

  ul {
    margin-top: 2rem;
    max-height: 83%;
    ${scrollY}
  }

  .input-container {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 2rem;

    input {
      background-color: var(--color-gray-darker);
    }

    button {
      width: min-content;
      margin: 0;
      margin-left: 1rem;
    }
  }
`;
