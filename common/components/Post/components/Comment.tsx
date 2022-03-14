import { FC, useContext } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { postContext } from 'common/context/postContext';
import { loaderContext } from 'common/context/loaderContext';
import { storeContext } from 'common/context/storeContext';

import { AvatarVerySmall } from 'common/components/Avatars';
import { Header4 } from 'common/components/Headers';
import { PostAuthor, PostDetails } from '../styles/Post.elements';
import { CommentContainer, CommentContent } from '../styles/Comment.elements';
import { KeyedMutator } from 'swr';
import { handleLikeClick } from '../helpers';
import { focusClick } from 'common/lib/utility';

interface Props extends PostType {
  mutate: KeyedMutator<PostType>;
}

const Comment: FC<Props> = ({
  _id,
  author,
  content,
  likes,
  imageURLs,
  comments,
  mutate,
}) => {
  const { likedPosts, refetchAll } = useContext(storeContext);
  const { showPost } = useContext(postContext);
  const { setLoading } = useContext(loaderContext);

  return (
    <CommentContainer
      onClick={() => showPost(_id)}
      tabIndex={0}
      onKeyDown={e => focusClick(e, () => showPost(_id))}
    >
      <PostAuthor>
        <AvatarVerySmall imageURL={author.imageURL} />
        <div>
          <Header4>{author.fName + ' ' + author.lName}</Header4>
        </div>
      </PostAuthor>
      <CommentContent>{content}</CommentContent>
      <PostDetails liked={likedPosts.some(post => post._id === _id)}>
        <span
          className="heart"
          onClick={e => handleLikeClick(e, _id, setLoading, refetchAll, mutate)}
          tabIndex={0}
          onKeyDown={e => {
            e.stopPropagation();
            focusClick(e, () =>
              handleLikeClick(null, _id, setLoading, refetchAll, mutate)
            );
          }}
        >
          <AiFillHeart /> {likes}
        </span>
        <span onClick={e => e.stopPropagation()} tabIndex={0}>
          <FaComment /> {comments.length}
        </span>
      </PostDetails>
    </CommentContainer>
  );
};

export default Comment;
