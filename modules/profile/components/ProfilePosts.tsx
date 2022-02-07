import { Dispatch, FC, SetStateAction, useRef } from 'react';

import { BsChevronDown } from 'react-icons/bs';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

import useWindowSize from 'common/hooks/useWindowSize';

import { Flex } from 'common/components/Flex';
import { Header3 } from 'common/components/Headers';
import {
  animateIcon,
  animateProfilePosts,
} from '../animations/ProfilePosts.animations';
import { PostsContainer } from '../styles/ProfilePosts.elements';
import Post, { defaultPost } from 'common/components/Post/components/Post';

interface Props {
  topVisible: boolean;
  setTopVisible: Dispatch<SetStateAction<boolean>>;
  user: UserType;
}

const ProfilePosts: FC<Props> = ({ topVisible, setTopVisible, user }) => {
  const [, height] = useWindowSize();

  const listRef = useRef<HTMLUListElement>(null);

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
      <ul ref={listRef}>
        <Post
          {...defaultPost}
          author={user}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum alias necessitatibus asperiores natus blanditiis eligendi quis recusandae rerum temporibus, beatae aut quasi assumenda veritatis amet deserunt tenetur enim vitae."
        />
      </ul>
    </PostsContainer>
  );
};

export default ProfilePosts;
