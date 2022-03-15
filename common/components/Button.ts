import styled from '@emotion/styled';

export const Button = styled.button<{
  inputSize?: boolean;
  icon?: boolean;
  width?: string;
  secondary?: boolean;
}>`
  border-radius: 3rem;
  font-size: 1.6rem;
  width: ${({ inputSize, width }) =>
    width ? width : inputSize ? '25rem' : '100%'};
  padding: 1rem;
  font-weight: ${({ secondary }) => (!secondary ? 700 : 500)};
  text-aling: center;

  background-color: ${({ secondary }) =>
    !secondary ? 'var(--color-primary)' : 'rgba(197,197,197,0.15)'};
  color: ${({ secondary }) =>
    !secondary ? 'var(--color-black)' : 'var(--color-white)'};
  border: none;
  position: relative;
  z-index: 1;

  :focus {
    opacity: 0.8;
  }

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
  :active {
    opacity: 0.6;
  }
  ${({ icon }) =>
    icon
      ? `display: flex;
        align-items: center;
        justify-conent: center;
        width: min-content;`
      : ''}

  svg {
    fill: black;
    width: 2.3rem;
    height: 2.3rem;
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
