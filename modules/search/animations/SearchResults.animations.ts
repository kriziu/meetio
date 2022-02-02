export const animateContainer = {
  open: {
    height: '80vh',
    padding: '2rem',
    opacity: 1,
    transition: {
      type: 'spring',
    },
  },
  closed: {
    height: 0,
    padding: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
