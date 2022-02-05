import { FC } from 'react';

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

const Post: FC<PostType> = ({
  author,
  content,
  likes,
  commentsCount,
  imageURLs,
  isPublic,
}) => {
  return (
    <PostContainer as="li">
      <PostAuthor>
        <AvatarVerySmall imageURL={author.imageURL} />
        <div>
          <Header4>{author.fName + ' ' + author.lName}</Header4>
          <Header5>{isPublic ? 'Public' : 'Friends'}</Header5>
        </div>
      </PostAuthor>
      <PostContent>{content}</PostContent>
      <PostDetails liked={false}>
        <span className="heart">
          <AiFillHeart /> {likes}
        </span>
        <span>
          <FaComment /> {commentsCount}
        </span>
      </PostDetails>
    </PostContainer>
  );
};

export default Post;
