import { FC, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { userContext } from 'common/context/userContext';
import { useBigSpinner } from 'common/hooks/useSpinner';

import ProfilePosts from './ProfilePosts';
import ProfileTop from './ProfileTop';
import useSWR from 'swr';

const Profile: FC = () => {
  const me = useContext(userContext).user;

  const router = useRouter();
  const userId = router.query.userId as string;

  const [user, setUser] = useState<UserType>(me);
  const [topVisible, setTopVisible] = useState(true);

  const [BigSpinner, setLoading, loading] = useBigSpinner();

  const { data, error } = useSWR<UserType>(userId && `/api/user/${userId}`);

  useEffect(() => {
    setTopVisible(true);
    if (me._id === userId) {
      setUser(me);
      setLoading(false);
      return;
    }

    if (!data) setLoading(true);
    else {
      setUser(data);
      setLoading(false);
    }
  }, [userId, me, me._id, data, setLoading]);

  if (error) return <>Invalid profile id</>;

  if (loading) return <BigSpinner />;

  return (
    <>
      <ProfileTop
        user={user}
        setUser={setUser}
        setTopVisible={setTopVisible}
        topVisible={topVisible}
      />
      <ProfilePosts
        setTopVisible={setTopVisible}
        topVisible={topVisible}
        user={user}
      />
    </>
  );
};

export default Profile;
