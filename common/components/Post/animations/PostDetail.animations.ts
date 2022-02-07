export const animatePost = {
  show: {
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.4,
      bounce: 0.3,
    },
  },
  hide: {
    y: '-100vh',
    height: 0,
    transition: {
      duration: 0.2,
    },
  },
};
