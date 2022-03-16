import { FC } from 'react';

import useSWR from 'swr';
import { motion } from 'framer-motion';

import Post from 'common/components/Post/components/Post';
import { Header1 } from 'common/components/Headers';
import { ForYouContainer } from '../elements/ForYou.elements';
import {
  animateList,
  animateListItem,
} from 'common/animations/list.animations';

const ForYou: FC = () => {
  const { data, mutate } = useSWR<PostType[]>('/api/foryou');

  return (
    <ForYouContainer>
      <Header1>For you</Header1>
      <motion.ul variants={animateList} initial="hidden" animate="show">
        {data?.map(post => (
          <motion.li key={post._id} variants={animateListItem}>
            <Post {...post} mutate={mutate} />
          </motion.li>
        ))}
      </motion.ul>
    </ForYouContainer>
  );
};

export default ForYou;
