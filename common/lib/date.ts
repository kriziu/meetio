export const getDate = (date: Date) =>
  `${(date.getDate() < 10 ? '0' : '') + date.getDate()}/${
    (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  }/${date.getFullYear()}`;
