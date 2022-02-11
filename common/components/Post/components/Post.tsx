import { FC, MouseEvent, RefObject, useContext, useState } from 'react';

import { KeyedMutator } from 'swr';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { storeContext } from 'common/context/storeContext';
import { loaderContext } from 'common/context/loaderContext';

import { AvatarVerySmall } from 'common/components/Avatars';
import { Header4, Header5 } from 'common/components/Headers';
import {
  PostAuthor,
  PostContainer,
  PostContent,
  PostDetails,
} from '../styles/Post.elements';
import PostDetail from './PostDetail';

export const defaultPost = {
  _id: '-1',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla placerat non nibh ut gravida. Curabitur blandit, lectus vel vulputate tempus, quam mauris tristique nibh, sed semper leo ipsum vitae tellus. Ut sit amet gravida sapien, ut sollicitudin sapien.',
  isPublic: true,
  likes: 100,
  commentsCount: 100,
  comments: [],
  imageURLs: [],
};

interface Props extends PostType {
  dontOpen?: boolean;
  comment?: boolean;
  inDetails?: boolean;
  setAllContent?: boolean;
  postContentRef?: RefObject<HTMLDivElement>;
  mutate: KeyedMutator<PostType[]>;
}

const Post: FC<Props> = props => {
  const {
    _id,
    author,
    content,
    likes,
    commentsCount,
    imageURLs,
    isPublic,
    comments,
    comment,
    dontOpen,
    inDetails,
    setAllContent,
    postContentRef,
    mutate,
  } = props;

  const { likedPosts, refetchAll } = useContext(storeContext);
  const { setLoading } = useContext(loaderContext);

  const [details, setDetails] = useState(false);

  const handleLikeClick = (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();

    setLoading(true);

    axios.post('/api/post/like', { postId: _id }).then(() => {
      new Promise(resolve => {
        let made = 0;

        const helper = () => {
          made++;
          if (made === 2) resolve('success');
        };

        mutate().then(helper);
        refetchAll().then(helper);
      }).then(() => setLoading(false));
    });
  };

  return (
    <>
      <AnimatePresence>
        {details && (
          <PostDetail {...props} closeDetail={() => setDetails(false)} />
        )}
      </AnimatePresence>

      <PostContainer
        as="li"
        inDetails={inDetails}
        onClick={() => !dontOpen && setDetails(!details)}
      >
        <PostAuthor>
          <AvatarVerySmall imageURL={author.imageURL} />
          <div>
            <Header4>{author.fName + ' ' + author.lName}</Header4>
            {!comment && <Header5>{isPublic ? 'Public' : 'Friends'}</Header5>}
          </div>
        </PostAuthor>
        <PostContent
          inDetails={inDetails}
          setAllContent={setAllContent}
          ref={postContentRef}
        >
          {content}
        </PostContent>
        <PostDetails liked={likedPosts.some(post => post._id === _id)}>
          <span className="heart" onClick={handleLikeClick} tabIndex={0}>
            <AiFillHeart /> {likes}
          </span>
          <span>
            <FaComment /> {commentsCount}
          </span>
        </PostDetails>
      </PostContainer>
    </>
  );
};

export default Post;
