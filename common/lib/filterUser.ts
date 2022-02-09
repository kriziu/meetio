export const filterUser = (user: UserType, term: string) => {
  return (
    user.fName.toLowerCase() +
    ' ' +
    user.lName.toLowerCase() +
    ' ' +
    user.email.toLowerCase()
  ).includes(term.toLowerCase());
};
