import { createContext, FC, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import PostDetail from 'common/components/Post/components/PostDetail';

export const postContext = createContext<{
  showPost: (_id: string | null) => void;
}>({ showPost: () => {} });

const PostProvider: FC = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const showPost = (_id: string | null) => {
    setSelectedPost(_id);
  };

  return (
    <postContext.Provider value={{ showPost }}>
      <AnimatePresence>
        {selectedPost && <PostDetail _id={selectedPost} />}
      </AnimatePresence>
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;
