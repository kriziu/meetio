import { createContext, FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AnimatePresence } from 'framer-motion';

import PostDetail from 'common/components/Post/components/PostDetail';

export const postContext = createContext<{
  showPost: (_id: string | null) => void;
}>({ showPost: () => {} });

const PostProvider: FC = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const router = useRouter();

  const showPost = (_id: string | null) => {
    const { pathname, query } = router;

    if (_id) router.push({ pathname, query: { ...query, postId: _id } });
    else router.push({ pathname, query: { ...query, postId: '' } });
  };

  useEffect(() => {
    const { postId } = router.query;

    if (postId) setSelectedPost(postId.toString());
    else setSelectedPost('');
  }, [router.query]);

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
