export const animateProfilePosts = {
  visible: {
    y: 0,
  },
  hidden: (height: number) => ({
    y: -height + 150,
  }),
};

export const animateIcon = {
  visible: {
    y: 0,
  },
  hidden: {
    y: -50,
    rotate: 180,
  },
};
