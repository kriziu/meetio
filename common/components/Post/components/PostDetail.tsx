import { FC, useRef, useState, WheelEvent } from 'react';

import { KeyedMutator } from 'swr';
import { AnimatePresence, motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

import Portal from 'common/components/Portal';
import { Comments, CustomBackground } from '../styles/PostDetails.elements';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import Post from './Post';
import { Header3 } from 'common/components/Headers';
import Comment from './Comment';
import {
  animateDetails,
  animatePost,
} from '../animations/PostDetail.animations';
import { PostContainer } from '../styles/PostDetails.elements';
import {
  animateList,
  animateListItem,
} from 'common/animations/list.animations';

interface Props extends PostType {
  closeDetail: () => void;
  comment?: boolean;
  mutate: KeyedMutator<PostType[]>;
}

const PostDetail: FC<Props> = props => {
  const listRef = useRef<HTMLUListElement>(null);
  const postContentRef = useRef<HTMLDivElement>(null);

  const [selectedComment, setSelectedComment] = useState(-1);
  const [showComments, setShowComments] = useState(false);
  const [allContent, setAllContent] = useState(false);

  const key = props._id + '1';

  const handlers = useSwipeable({
    onSwipedUp: e => {
      if (e.absY > 50 && !allContent) setShowComments(true);
    },
    onSwipedDown: e => {
      const current = listRef.current;
      if (!current) return;

      if (e.absY > 50 && listRef.current.scrollTop <= 0) setShowComments(false);
    },
  });

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const currentList = listRef.current;
    const currentContent = postContentRef.current;
    if (!currentList || !currentContent) return;

    if (e.deltaY < 0 && currentList.scrollTop <= 0) {
      setShowComments(false);
      return;
    }

    if (
      currentContent.scrollTop + currentContent.clientHeight !==
        currentContent.scrollHeight &&
      allContent
    )
      return;

    setAllContent(false);
    setShowComments(true);
  };

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
          onWheel={handleWheel}
          animate={selectedComment === -1 ? 'shown' : 'hidden'}
          {...animateDetails}
          key={key}
          {...handlers}
        >
          <Flex className="btn">
            <Button onClick={props.closeDetail}>Back</Button>
          </Flex>

          <PostContainer
            variants={animatePost}
            animate={allContent ? 'content' : showComments ? 'hide' : 'show'}
            onClick={() => setAllContent(prev => !prev)}
          >
            <Post
              {...props}
              dontOpen
              inDetails
              comment={props.comment}
              setAllContent={allContent}
              postContentRef={postContentRef}
            />
          </PostContainer>

          <Comments onClick={() => setSelectedComment(1)}>
            <Header3
              onClick={e => {
                e.stopPropagation();
                setAllContent(false);
                setShowComments(!showComments);
              }}
            >
              Comments
            </Header3>
            <motion.ul
              ref={listRef}
              variants={animateList}
              initial="hidden"
              animate="show"
            >
              {props.comments.map(comment => {
                <motion.li variants={animateListItem} key={comment._id}>
                  <Comment {...comment} />
                </motion.li>;
              })}
            </motion.ul>
          </Comments>
        </CustomBackground>
      </Portal>
    </>
  );
};

export default PostDetail;
