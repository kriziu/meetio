import type { NextPage } from 'next';
import { useContext, useState } from 'react';

import { defaultPost } from 'common/components/Post/components/Post';
import PostDetail from 'common/components/Post/components/PostDetail';
import { userContext } from 'common/context/userContext';

const Home: NextPage = () => {
  const { user } = useContext(userContext);

  const [a, set] = useState(false);

  return (
    <div
      onClick={() => set(p => !p)}
      style={{ width: '100%', height: '100vh' }}
    >
      {a && <PostDetail {...defaultPost} author={user} />}
    </div>
  );
};

export default Home;
