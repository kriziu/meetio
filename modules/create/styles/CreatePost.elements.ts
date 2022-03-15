import styled from '@emotion/styled';
import { Card } from 'common/components/Card';
import { scrollY } from 'common/styles/scroll';

export const StyledDiv = styled.div`
  h4 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 2rem;
    text-align: left;
    margin-left: 2rem;
    margin-bottom: 0.5rem;
  }

  button {
    margin-top: 2rem;
    max-width: 30rem;
    width: 75%;
  }

  .visible {
    justify-content: flex-start;

    select {
      border: none;
      border-radius: 3rem;
      font-size: 1.6rem;
      padding: 0.9rem;
      background-color: rgba(146, 146, 146, 0.22);

      margin-top: 1.5rem;
      margin-left: 1rem;
    }
  }
`;

export const CreateCard = styled(Card)`
  textarea {
    width: 100%;
    height: 25vh;
    background: none;
    resize: none;
    border: none;
    border-radius: 3rem;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.2);
    ${scrollY}
  }

  .top {
    margin-bottom: 1rem;
  }

  .img {
    margin-top: 0.5rem;
  }

  div {
    justify-content: flex-start;

    h4 {
      margin: 0;
      margin-left: 1rem;
    }

    svg {
      margin-left: 1rem;
    }
  }
`;
