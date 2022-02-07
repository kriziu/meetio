export const animateBg = {
  open: {
    clipPath: `circle(200% at calc(100vw - 4.5rem) 4.5rem)`,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
  closed: {
    clipPath: 'circle(1rem at calc(100vw - 4.5rem) 4.5rem)',
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
};

export const animateList = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.07, staggerDirection: -1 },
  },
};
