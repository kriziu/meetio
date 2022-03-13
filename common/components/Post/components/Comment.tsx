import { FC, useContext } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { postContext } from 'common/context/postContext';

import { AvatarVerySmall } from 'common/components/Avatars';
import { Header4 } from 'common/components/Headers';
import { PostAuthor, PostDetails } from '../styles/Post.elements';
import { CommentContainer, CommentContent } from '../styles/Comment.elements';

const Comment: FC<PostType> = ({
  _id,
  author,
  content,
  likes,
  imageURLs,
  comments,
}) => {
  const { showPost } = useContext(postContext);

  return (
    <CommentContainer onClick={() => showPost(_id)}>
      <PostAuthor>
        <AvatarVerySmall imageURL={author.imageURL} />
        <div>
          <Header4>{author.fName + ' ' + author.lName}</Header4>
        </div>
      </PostAuthor>
      <CommentContent>{content}</CommentContent>
      <PostDetails liked={false} onClick={e => e.stopPropagation()}>
        <span className="heart">
          <AiFillHeart /> {likes}
        </span>
        <span>
          <FaComment /> {comments.length}
        </span>
      </PostDetails>
    </CommentContainer>
  );
};

export default Comment;
