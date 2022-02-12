export const checkIfNotRead = <T extends { read: boolean }>(arr: T[]) => {
  let notRead = false;

  arr.forEach(el => {
    if (!el.read) notRead = true;
  });

  return notRead;
};
