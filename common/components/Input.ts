import styled from '@emotion/styled';

export const Input = styled.input<{ warn?: boolean; full?: boolean }>`
  border-radius: 3rem;
  font-size: 1.6rem;
  width: ${({ full }) => (full ? '100%' : '25rem')};
  padding: 0.9rem;
  background-color: rgba(146, 146, 146, 0.22);

  border: ${props =>
    props.warn ? '2px var(--color-red) solid' : '2px transparent solid'};

  :focus {
    border-color: var(--color-blue);
    outline: none;
  }
`;
