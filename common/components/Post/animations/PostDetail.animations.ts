export const animateDetails = {
  initial: { y: -500, opacity: 0 },
  transition: {
    type: 'spring',
    duration: 0.5,
    bounce: 0.4,
  },
  variants: {
    hidden: { y: 500, opacity: 0 },
    shown: { y: 0, opacity: 1 },
  },
  exit: { y: 500, opacity: 0 },
};

export const animatePost = {
  content: {
    height: 'auto',
  },
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
    marginBottom: 0,
    transition: {
      duration: 0.2,
    },
  },
};
