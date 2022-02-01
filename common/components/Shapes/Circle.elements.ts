import styled from '@emotion/styled';
import { m } from 'framer-motion';

export const Circle = styled(m.div)<{
  radius: number;
  secondary?: number;
  position: { x: number; y: number };
}>`
  border-radius: 50%;
  background-color: ${({ secondary }) =>
    secondary === 1 ? '#FB4C26' : '#4442B1'};
  width: ${({ radius }) => radius}rem;
  height: ${({ radius }) => radius}rem;
  position: absolute;
  left: ${({ position, radius }) => `calc(${position.x}vw - ${radius}rem)`};
  top: ${({ position, radius }) => `calc(${position.y}vh - ${radius}rem)`};
  z-index: -50;

  transition: none;
`;
