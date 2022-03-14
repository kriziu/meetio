import { FC, MouseEvent, RefObject, useContext } from 'react';

import { KeyedMutator } from 'swr';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { storeContext } from 'common/context/storeContext';
import { loaderContext } from 'common/context/loaderContext';
import { postContext } from 'common/context/postContext';

import { AvatarVerySmall } from 'common/components/Avatars';
import { Header4, Header5 } from 'common/components/Headers';
import {
  PostAuthor,
  PostContainer,
  PostContent,
  PostDetails,
} from '../styles/Post.elements';
import { handleLikeClick } from '../helpers';
import { focusClick } from 'common/lib/utility';

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
  mutate: KeyedMutator<PostType[]> | (() => Promise<any>);
}

const Post: FC<Props> = props => {
  const {
    _id,
    author,
    content,
    likes,
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

  const { showPost } = useContext(postContext);
  const { likedPosts, refetchAll } = useContext(storeContext);
  const { setLoading } = useContext(loaderContext);

  return (
    <PostContainer
      inDetails={inDetails}
      onClick={() => {
        if (!dontOpen) {
          showPost(_id);
        }
      }}
      tabIndex={inDetails ? -1 : 0}
      onKeyDown={e => focusClick(e, () => showPost(_id))}
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
        <span
          className="heart"
          onClick={e => handleLikeClick(e, _id, setLoading, refetchAll, mutate)}
          tabIndex={0}
          onKeyDown={e =>
            focusClick(e, () =>
              handleLikeClick(null, _id, setLoading, refetchAll, mutate)
            )
          }
        >
          <AiFillHeart /> {likes}
        </span>
        <span>
          <FaComment /> {comments.length}
        </span>
      </PostDetails>
    </PostContainer>
  );
};

export default Post;
