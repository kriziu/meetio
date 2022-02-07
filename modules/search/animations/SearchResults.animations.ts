export const animateContainer = {
  open: {
    height: '80vh',
    padding: '2rem',
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.7,
      bounce: 0.4,
    },
  },
  closed: {
    height: 0,
    padding: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
