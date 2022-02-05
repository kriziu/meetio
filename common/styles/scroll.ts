export const scrollY = `
overflow-y: scroll;

::-webkit-scrollbar {
  width: 2rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px 10px transparent;
  border: solid 6px transparent;
}


::-webkit-scrollbar-thumb {
  border-radius: 5rem;
  box-shadow: inset 0 0 10px 10px var(--color-gray-darker);
    border: solid 6px transparent;
}
`;
