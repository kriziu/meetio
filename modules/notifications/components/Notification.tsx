import { FC, MutableRefObject, useContext } from 'react';

import { postContext } from 'common/context/postContext';

import { Button } from 'common/components/Button';
import UserCard from 'common/components/UserCard/UserCard';

const messages = {
  like: 'Liked you post.',
  mention: 'Mentioned you.',
  reply: 'Replied.',
  comment: 'Commented.',
};

interface Props extends NotificationType {
  childrenRefs: MutableRefObject<HTMLLIElement[]>;
  index: number;
}

const Notification: FC<Props> = ({
  _id,
  type,
  date,
  who,
  read,
  childrenRefs,
  index,
  postId,
}) => {
  const { showPost } = useContext(postContext);

  return (
    <UserCard
      {...who}
      smallText={messages[type]}
      notify={!read}
      ref={(el: HTMLLIElement) => el && (childrenRefs.current[index] = el)}
      htmlId={_id}
    >
      <Button onClick={() => showPost(postId)}>Check</Button>
    </UserCard>
  );
};

export default Notification;
