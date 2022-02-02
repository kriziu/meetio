import { FC, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import axios from 'axios';
import { BsChevronDown } from 'react-icons/bs';

import { userContext } from 'common/context/userContext';

import { Avatar } from 'common/components/Avatars';
import { Center } from '../styles/ProfileTop.elements';
import { Header1, Header3, Header5 } from 'common/components/Headers';
import { Button } from 'common/components/Button';
import { Flex } from 'common/components/Flex';

const ProfileTop: FC = () => {
  const me = useContext(userContext).user;

  const router = useRouter();
  const userId = router.query.userId as string;

  const [user, setUser] = useState<UserType>(me);

  useEffect(() => {
    if (me._id === userId) {
      setUser(me);
      return;
    }

    axios.get(`/api/user/${userId}`).then(res => setUser(res.data));
  }, [userId, me, me._id]);

  return (
    <Center>
      <Avatar imageURL={user.imageURL} />
      <Header1>
        {user.fName} {user.lName}
      </Header1>
      <Header5>Followed by 0 people</Header5>
      <Flex className="buttons">
        <Button>Add friend</Button>
        <Button>Follow</Button>
      </Flex>
      <Flex className="bottom">
        <Header3>See user post</Header3>
        <BsChevronDown />
      </Flex>
    </Center>
  );
};

export default ProfileTop;
