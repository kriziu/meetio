import styled from '@emotion/styled';
import { Flex } from 'common/components/Flex';

export const NavBtn = styled.button<{ active: boolean; opened: boolean }>`
  width: 4rem;
  height: 4rem;
  position: fixed;
  top: 2.5rem;
  background-color: var(--color-primary);
  border: none;
  right: 2.5rem;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.7rem;

  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }

  /* ::after {
    opacity: ${({ active }) => (active ? 1 : 0)};
    content: ' ';
    position: absolute;
    right: 0;
    bottom: 0.5rem;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background-color: var(--color-red);
  } */
`;

export const NavBtnIcon = styled.span<{ opened: boolean }>`
  border: none;
  border-radius: 1rem;
  background-color: var(--color-black);
  position: relative;
  display: inline-block;
  width: 2.3rem;
  height: 0.4rem;

  transition: var(--trans-default);

  transform: ${({ opened }) => (opened ? 'rotate(225deg)' : 'rotate(0)')};

  :focus {
    outline: var(--color-blue);
  }

  ::after {
    border-radius: 1rem;
    content: '';
    display: inline-block;
    position: absolute;
    width: 2.3rem;
    height: 0.4rem;
    top: -0.6rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-black);
    transition: var(--trans-default);

    opacity: ${({ opened }) => (opened ? 0 : 1)};
  }

  ::before {
    content: '';
    border-radius: 1rem;
    display: inline-block;
    position: absolute;
    width: 2.3rem;
    height: 0.4rem;
    top: ${({ opened }) => (opened ? ' 0' : ' 0.6rem')};
    left: 50%;
    transform: translateX(-50%)
      ${({ opened }) => (opened ? 'rotate(90deg)' : 'rotate(0)')};
    background-color: var(--color-black);

    transition: var(--trans-default);
  }
`;

export const NavBackground = styled(Flex)`
  background-color: var(--color-primary);
  height: 100vh;
  width: 100vw;
  position: absolute;

  a {
    color: var(--color-black);
    font-size: 3rem;
    user-select: none;
  }

  li {
    margin-top: 2rem;
    text-align: center;

    :hover {
      transform: scale(1.1);
    }
  }

  z-index: 10;
`;
