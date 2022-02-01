import { css, Global } from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *::after,
      *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        font-family: 'Montserrat', sans-serif;
        transition: var(--trans-default);
        color: var(--color-white);
      }

      li {
        list-style: none;
      }

      svg {
        color: var(--color-white);
        width: 2.3rem;
        height: 2.3rem;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        box-sizing: border-box;
        transition: all 0.3s;
        overflow: hidden;
        background-color: #181818;
        height: 100%;
      }

      html {
        font-size: 62.5%;
        height: 100%;
      }

      a {
        color: var(--color-white);
        text-decoration: none;
      }

      :root {
        // COLORS
        --color-gray: #cbd5e0;
        --color-gray-dark: #9ea3a8;
        --color-gray-darker: #343434;
        --color-black: #222;
        --color-white: #fff;
        --color-red: #fc2c2c;
        --color-green: #00ff57;
        --color-blue: #3ea8e5;
        --color-primary: #ffec43;
        // TRANSITIONS
        --trans-default: all 0.2s ease;
        --trans-long: all 0.7s ease;
        // SHADOWS
        --shadow-default: 0px 5px 30px 2px rgba(0, 0, 0, 0.2);
      }
    `}
  />
);
