export const sortAlph = <T extends { fName: string; lName: string }>(
  a: T,
  b: T,
  type: 'A' | 'Z' = 'A'
) => {
  if (type === 'Z') {
    if (a.fName > b.fName) return -1;
    if (b.fName > a.fName) return 1;
    return 0;
  }

  if (a.fName > b.fName) return 1;
  if (b.fName > a.fName) return -1;
  return 0;
};
