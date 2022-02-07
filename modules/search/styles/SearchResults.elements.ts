import styled from '@emotion/styled';
import { Card } from 'common/components/Card';
import { motion } from 'framer-motion';

export const ResultsContainer = motion(styled(Card)<{ shown: boolean }>`
  margin-top: 6.5rem;
  height: 80vh;
  user-select: none;

  ${({ shown }) => !shown && 'pointer-events: none;'}
`);
