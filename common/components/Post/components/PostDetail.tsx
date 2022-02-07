import { FC, useRef, useState } from 'react';

import Portal from 'common/components/Portal';
import { Comments, CustomBackground } from '../styles/PostDetails.elements';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import Post from './Post';
import { Header3 } from 'common/components/Headers';
import Comment from './Comment';
import { AnimatePresence, motion } from 'framer-motion';
import { animatePost } from '../animations/PostDetail.animations';
import { useSwipeable } from 'react-swipeable';

interface Props extends PostType {
  closeDetail: () => void;
  comment?: boolean;
}

const PostDetail: FC<Props> = props => {
  const listRef = useRef<HTMLUListElement>(null);

  const [selectedComment, setSelectedComment] = useState(-1);
  const [showComments, setShowComments] = useState(false);

  const key = props._id + '1';

  const handlers = useSwipeable({
    onSwipedUp: e => {
      if (e.absY > 50) setShowComments(true);
    },
    onSwipedDown: e => {
      const current = listRef.current;
      if (!current) return;

      if (e.absY > 50 && listRef.current.scrollTop <= 0) setShowComments(false);
    },
  });

  return (
    <>
      <AnimatePresence>
        {selectedComment !== -1 && (
          <PostDetail
            {...props}
            closeDetail={() => setSelectedComment(-1)}
            likes={selectedComment}
            _id={key}
            comment
          />
        )}
      </AnimatePresence>
      <Portal>
        <CustomBackground
          initial={{ y: -500, opacity: 0 }}
          transition={{
            type: 'spring',
            duration: 0.5,
            bounce: 0.4,
          }}
          animate={
            selectedComment === -1
              ? { y: 0, opacity: 1 }
              : { y: 500, opacity: 0 }
          }
          exit={{ y: 500, opacity: 0 }}
          key={key}
          {...handlers}
        >
          <Flex className="btn">
            <Button onClick={props.closeDetail}>Back</Button>
          </Flex>

          <motion.div
            variants={animatePost}
            animate={showComments ? 'hide' : 'show'}
          >
            <Post {...props} dontOpen comment={props.comment} />
          </motion.div>

          <Comments onClick={() => setSelectedComment(1)}>
            <Header3
              onClick={e => {
                e.stopPropagation();
                setShowComments(!showComments);
              }}
            >
              Comments
            </Header3>
            <ul ref={listRef}>
              <Comment {...props} likes={50} />
              <Comment {...props} />
              <Comment {...props} />
              <Comment {...props} />
            </ul>
          </Comments>
        </CustomBackground>
      </Portal>
    </>
  );
};

export default PostDetail;
