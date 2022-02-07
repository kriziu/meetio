export const animateItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      bounce: 0.4,
      type: 'spring',
    },
  },
  closed: {
    y: 200,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.7,
      bounce: 0.4,
    },
  },
};
