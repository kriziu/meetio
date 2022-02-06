import { FC } from 'react';

import Portal from 'common/components/Portal';
import { Comments, CustomBackground } from '../styles/PostDetails.elements';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';
import Post from './Post';
import { Header3 } from 'common/components/Headers';
import Comment from './Comment';

const PostDetail: FC<PostType> = props => {
  return (
    <Portal>
      <CustomBackground>
        <Flex className="btn">
          <Button>Back</Button>
        </Flex>

        <Post {...props} />

        <Comments>
          <Header3>Comments</Header3>
          <Comment {...props} />
          <Comment {...props} />
        </Comments>
      </CustomBackground>
    </Portal>
  );
};

export default PostDetail;
