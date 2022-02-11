import { FC, useContext, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import { BsImage } from 'react-icons/bs';

import { userContext } from 'common/context/userContext';

import { Header2, Header4 } from 'common/components/Headers';
import { CreateCard, StyledDiv } from '../styles/CreatePost.elements';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import { AvatarSmall } from 'common/components/Avatars';
import { promiseToast } from 'common/lib/toasts';

const CreatePost: FC = () => {
  const {
    user: { fName, lName, imageURL, _id },
  } = useContext(userContext);

  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const router = useRouter();

  const handleCreatePost = () => {
    promiseToast(
      axios
        .post<PostType>('/api/post', {
          isPublic,
          content,
          imageURLs: [],
        })
        .then(() => router.push(`/profile/${_id}`)),
      'Creating post...',
      'Created!'
    );
  };

  return (
    <StyledDiv>
      <Header2>Create new post</Header2>
      <Header4>Post content</Header4>
      <CreateCard>
        <Flex className="top">
          <AvatarSmall imageURL={imageURL} />
          <Header4>{fName + ' ' + lName}</Header4>
        </Flex>

        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <Flex className="img">
          <Header4>Add images to post</Header4>
          <BsImage />
        </Flex>
      </CreateCard>
      <Flex className="visible">
        <Header4>Post visibility</Header4>
        <select
          value={isPublic ? 'Public' : 'Friends'}
          onChange={e => setIsPublic(!isPublic)}
        >
          <option>Friends</option>
          <option>Public</option>
        </select>
      </Flex>

      <Flex>
        <Button onClick={handleCreatePost}>Create</Button>
      </Flex>
    </StyledDiv>
  );
};

export default CreatePost;
