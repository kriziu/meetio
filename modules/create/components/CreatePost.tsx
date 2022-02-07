import { Card } from 'common/components/Card';
import { Header2, Header4 } from 'common/components/Headers';
import { FC } from 'react';

const CreatePost: FC = () => {
  return (
    <div>
      <Header2>Create new post</Header2>
      <Header4>Post content</Header4>
      <Card>
        <textarea />
        <Header4>Add images to post</Header4>
      </Card>
      <Header4>Post visibility</Header4>
    </div>
  );
};

export default CreatePost;
