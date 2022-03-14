import { FC, useContext, useState } from 'react';

import { motion } from 'framer-motion';

import { storeContext } from 'common/context/storeContext';
import useWindowSize from 'common/hooks/useWindowSize';

import { LikedContainer } from '../styles/Liked.elements';
import Post from 'common/components/Post/components/Post';
import { Header1 } from 'common/components/Headers';
import {
  animateList,
  animateListItem,
} from 'common/animations/list.animations';
import SearchList from 'common/components/SearchList/SearchList';
import { filterUser } from 'common/lib/filterUser';

const Liked: FC = () => {
  const { likedPosts } = useContext(storeContext);

  const [search, setSearch] = useState('');

  const [, height] = useWindowSize();

  return (
    <LikedContainer height={height}>
      <Header1>Liked posts</Header1>
      <SearchList
        input={search}
        handleInputChange={e => setSearch(e.target.value)}
        sort="A"
        handleSortChange={() => {}}
      />
      <motion.ul variants={animateList} initial="hidden" animate="show">
        {likedPosts
          .filter(post => filterUser(post.author, search))
          .map((post, i) => (
            <motion.li key={post._id} variants={animateListItem}>
              <Post
                {...post}
                mutate={() => new Promise(resolve => resolve('success'))}
              />
            </motion.li>
          ))}
      </motion.ul>
    </LikedContainer>
  );
};

export default Liked;
