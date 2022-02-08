export const animateListItem = {
  hidden: { y: -50, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export const animateList = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};
