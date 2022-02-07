import { FC, RefObject, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { AvatarVerySmall } from 'common/components/Avatars';
import { Header4, Header5 } from 'common/components/Headers';
import {
  PostAuthor,
  PostContainer,
  PostContent,
  PostDetails,
} from '../styles/Post.elements';
import PostDetail from './PostDetail';
import { AnimatePresence } from 'framer-motion';

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
}

const Post: FC<Props> = props => {
  const {
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
  } = props;

  const [details, setDetails] = useState(false);

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
        <PostDetails>
          <span className="heart">
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
