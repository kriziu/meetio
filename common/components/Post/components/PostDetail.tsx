import {
  FC,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from 'react';

import useSWR from 'swr';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { BiSend } from 'react-icons/bi';
import axios from 'axios';

import { postContext } from 'common/context/postContext';
import { loaderContext } from 'common/context/loaderContext';
import useWindowSize from 'common/hooks/useWindowSize';

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
import { Input } from 'common/components/Input';
import { promiseToast } from 'common/lib/toasts';

interface Props {
  _id: string;
}

const PostDetail: FC<Props> = ({ _id }) => {
  const { showPost } = useContext(postContext);
  const { setLoading } = useContext(loaderContext);

  const [, height] = useWindowSize();

  const listRef = useRef<HTMLUListElement>(null);
  const postContentRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [allContent, setAllContent] = useState(false);

  const { data, error, mutate } = useSWR<PostType>(`/api/post/${_id}`);

  useEffect(() => {
    setShowComments(false);
    if (!data && !error) setLoading(true);
    else setLoading(false);
  }, [data, error, setLoading]);

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

  const handleCommentCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput('');

    promiseToast(
      axios
        .post<PostType>('/api/post', {
          isPublic: data?.isPublic,
          content: input,
          imageURLs: [],
          parentPost: _id,
        })
        .then(() => mutate()),
      'Creating comment...',
      'Commented!'
    );
  };

  if (!data && !error) return null;

  if (error || !data) return null;

  return (
    <Portal>
      <CustomBackground
        height={height}
        onWheel={handleWheel}
        animate={true ? 'shown' : 'hidden'}
        {...animateDetails}
        key={_id}
        {...handlers}
      >
        <Flex className="btn">
          <Button onClick={() => showPost(data.parentPost)}>Back</Button>
        </Flex>

        <PostContainer
          variants={animatePost}
          animate={allContent ? 'content' : showComments ? 'hide' : 'show'}
          onClick={() => setAllContent(prev => !prev)}
        >
          <Post
            mutate={mutate}
            {...data}
            dontOpen
            inDetails
            setAllContent={allContent}
            postContentRef={postContentRef}
          />
        </PostContainer>

        <Comments>
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
            {data.comments.map(comment => (
              <motion.li variants={animateListItem} key={comment._id}>
                <Comment {...comment} mutate={mutate} />
              </motion.li>
            ))}
          </motion.ul>
          <form className="input-container" onSubmit={handleCommentCreate}>
            <Input value={input} onChange={e => setInput(e.target.value)} />
            <Button icon>
              <BiSend />
            </Button>
          </form>
        </Comments>
      </CustomBackground>
    </Portal>
  );
};

export default PostDetail;
