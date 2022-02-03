export const animateProfilePosts = {
  visible: {
    y: 0,
  },
  hidden: (height: number) => ({
    y: -height + 150,
  }),
};
