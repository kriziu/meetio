import { Dispatch, FC, SetStateAction, useRef } from 'react';

import { BsChevronDown } from 'react-icons/bs';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import Link from 'next/link';

import useWindowSize from 'common/hooks/useWindowSize';

import { Flex } from 'common/components/Flex';
import { Header3 } from 'common/components/Headers';
import {
  animateIcon,
  animateProfilePosts,
} from '../animations/ProfilePosts.animations';
import { PostsContainer } from '../styles/ProfilePosts.elements';
import Post from 'common/components/Post/components/Post';
import {
  animateList,
  animateListItem,
} from 'common/animations/list.animations';
import { Button } from 'common/components/Button';

interface Props {
  topVisible: boolean;
  setTopVisible: Dispatch<SetStateAction<boolean>>;
  user: UserType;
}

const ProfilePosts: FC<Props> = ({ topVisible, setTopVisible, user }) => {
  const [, height] = useWindowSize();

  const listRef = useRef<HTMLUListElement>(null);

  const { data, mutate } = useSWR<PostType[]>(
    user._id && `/api/post?author=${user._id}`
  );

  const handlers = useSwipeable({
    onSwipedDown: e => {
      const current = listRef.current;
      if (!current) return;

      if (e.absY > 50 && listRef.current.scrollTop <= 0) setTopVisible(true);
    },
  });

  return (
    <PostsContainer
      variants={animateProfilePosts}
      animate={topVisible ? 'visible' : 'hidden'}
      custom={height}
      {...handlers}
      onWheel={e => {
        const current = listRef.current;
        if (!current) return;

        if (e.deltaY < 0 && current.scrollTop <= 0) setTopVisible(true);
      }}
      height={height}
      visible={topVisible}
    >
      <Flex className="icon">
        <Header3 onClick={() => setTopVisible(prev => !prev)}>
          {topVisible ? 'See user post' : 'See user profile'}
        </Header3>
        <motion.div variants={animateIcon}>
          <BsChevronDown />
        </motion.div>
      </Flex>
      {!topVisible && (
        <Link href="/liked" passHref>
          <Button as="a">Liked posts</Button>
        </Link>
      )}

      <motion.ul
        ref={listRef}
        variants={animateList}
        initial="hidden"
        animate={topVisible ? 'hidden' : 'show'}
      >
        {data?.map(post => {
          return (
            <motion.li key={post._id} variants={animateListItem}>
              <Post {...post} mutate={mutate} />
            </motion.li>
          );
        })}
      </motion.ul>
    </PostsContainer>
  );
};

export default ProfilePosts;
