import { Dispatch, FC, SetStateAction, useRef } from 'react';

import { BsChevronDown } from 'react-icons/bs';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

import useWindowSize from 'common/hooks/useWindowSize';

import { Flex } from 'common/components/Flex';
import { Header3 } from 'common/components/Headers';
import { animateProfilePosts } from '../animations/ProfilePosts.animations';

interface Props {
  topVisible: boolean;
  setTopVisible: Dispatch<SetStateAction<boolean>>;
}

const ProfilePosts: FC<Props> = ({ topVisible, setTopVisible }) => {
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
    <motion.div
      variants={animateProfilePosts}
      animate={topVisible ? 'visible' : 'hidden'}
      custom={height}
      style={{ height: '100vh' }}
      {...handlers}
    >
      <Flex>
        <Header3 onClick={() => setTopVisible(prev => !prev)}>
          See user post
        </Header3>
        <BsChevronDown />
      </Flex>
      <ul ref={listRef} style={{ height: '20rem', overflow: 'scroll' }}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>7</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>7</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>7</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>7</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>7</li>
      </ul>
    </motion.div>
  );
};

export default ProfilePosts;
