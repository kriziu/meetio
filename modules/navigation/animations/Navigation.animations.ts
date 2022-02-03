export const animateBg = {
  open: {
    clipPath: `circle(200% at calc(100vw - 4.5rem) 4.5rem)`,
    transition: {
      type: 'spring',
      stiffness: 50,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: 'circle(1rem at calc(100vw - 4.5rem) 4.5rem)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
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
