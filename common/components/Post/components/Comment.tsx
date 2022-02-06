import { FC } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

import { AvatarVerySmall } from 'common/components/Avatars';
import { Header4 } from 'common/components/Headers';
import { PostAuthor, PostDetails } from '../styles/Post.elements';
import { CommentContainer, CommentContent } from '../styles/Comment.elements';

const Comment: FC<PostType> = ({
  author,
  content,
  likes,
  commentsCount,
  imageURLs,
}) => {
  return (
    <CommentContainer>
      <PostAuthor>
        <AvatarVerySmall imageURL={author.imageURL} />
        <div>
          <Header4>{author.fName + ' ' + author.lName}</Header4>
        </div>
      </PostAuthor>
      <CommentContent>{content}</CommentContent>
      <PostDetails liked={false}>
        <span className="heart">
          <AiFillHeart /> {likes}
        </span>
        <span>
          <FaComment /> {commentsCount}
        </span>
      </PostDetails>
    </CommentContainer>
  );
};

export default Comment;
