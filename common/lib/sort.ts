export const sortAlph = <T extends { fName: string; lName: string }>(
  a: T,
  b: T,
  last = false
) => {
  if (last) {
    if (a.lName > b.lName) return 1;
    if (b.lName > a.lName) return -1;
    return 0;
  }

  if (a.fName > b.fName) return 1;
  if (b.fName > a.fName) return -1;
  return 0;
};
