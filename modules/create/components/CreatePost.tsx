import { FC, useContext, useState } from 'react';

import { BsImage } from 'react-icons/bs';

import { userContext } from 'common/context/userContext';

import { Header2, Header4 } from 'common/components/Headers';
import { CreateCard, StyledDiv } from '../styles/CreatePost.elements';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import { AvatarSmall } from 'common/components/Avatars';

const CreatePost: FC = () => {
  const {
    user: { fName, lName, imageURL },
  } = useContext(userContext);

  const [visibility, setVisibility] = useState('Friends');

  return (
    <StyledDiv>
      <Header2>Create new post</Header2>
      <Header4>Post content</Header4>
      <CreateCard>
        <Flex className="top">
          <AvatarSmall imageURL={imageURL} />
          <Header4>{fName + ' ' + lName}</Header4>
        </Flex>

        <textarea />
        <Flex className="img">
          <Header4>Add images to post</Header4>
          <BsImage />
        </Flex>
      </CreateCard>
      <Flex className="visible">
        <Header4>Post visibility</Header4>
        <select
          value={visibility}
          onChange={e => setVisibility(e.target.value)}
        >
          <option>Friends</option>
          <option>Public</option>
        </select>
      </Flex>

      <Flex>
        <Button>Create</Button>
      </Flex>
    </StyledDiv>
  );
};

export default CreatePost;
