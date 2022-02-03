import { FC, useContext, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import { userContext } from 'common/context/userContext';
import { useBigSpinner } from 'common/hooks/useSpinner';

import ProfilePosts from './ProfilePosts';
import ProfileTop from './ProfileTop';

const Profile: FC = () => {
  const me = useContext(userContext).user;

  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const userId = router.query.userId as string;

  const [user, setUser] = useState<UserType>(me);
  const [topVisible, setTopVisible] = useState(true);

  const [BigSpinner, setLoading, loading] = useBigSpinner();

  useEffect(() => {
    setTopVisible(true);
    if (me._id === userId) {
      setUser(me);
      return;
    }

    setLoading(true);

    userId &&
      axios.get(`/api/user/${userId}`).then(res => {
        setUser(res.data);
        setLoading(false);
      });
  }, [userId, me, me._id, setLoading]);

  useEffect(() => {
    const current = containerRef.current;
    if (!current) return;

    current.addEventListener('scroll', () => {
      console.log('123');
      current.scrollTo({ top: current.scrollHeight, behavior: 'smooth' });
    });
  });

  if (loading) return <BigSpinner />;

  return (
    <>
      <ProfileTop
        user={user}
        setTopVisible={setTopVisible}
        topVisible={topVisible}
      />
      <ProfilePosts setTopVisible={setTopVisible} topVisible={topVisible} />
    </>
  );
};

export default Profile;
