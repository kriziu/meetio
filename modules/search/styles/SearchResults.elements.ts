import styled from '@emotion/styled';
import { Card } from 'common/components/Card';
import { motion } from 'framer-motion';

export const ResultsContainer = motion(styled(Card)<{ shown: boolean }>`
  margin-top: 6.5rem;
  height: 80%;
  user-select: none;
  margin-bottom: 2rem;

  ${({ shown }) => !shown && 'pointer-events: none;'}
`);
