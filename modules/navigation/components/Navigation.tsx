import { FC, useContext, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { userContext } from 'common/context/userContext';
import { storeContext } from 'common/context/storeContext';

import {
  NavBackground,
  NavBtn,
  NavBtnIcon,
} from '../styles/Navigation.elements';
import { animateBg, animateList } from '../animations/Navigation.animations';
import NavigationItem from './NavigationItem';
import { checkIfNotRead } from 'common/lib/checkIfNotRead';

const MotionNavBackground = motion(NavBackground);

const Navigation: FC = () => {
  const {
    user: { _id },
  } = useContext(userContext);
  const { notifications, invites } = useContext(storeContext);

  const router = useRouter();

  const [notify, setNotify] = useState(false);
  const [show, setShow] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (router.pathname === '/login' || router.pathname === '/register')
      setShow(false);
    else setShow(true);

    const closeNav = () => setOpened(false);
    router.events.on('routeChangeStart', closeNav);

    return () => {
      router.events.off('routeChangeStart', closeNav);
    };
  }, [router.events, router.pathname]);

  useEffect(() => {
    let notifyTemp = checkIfNotRead(notifications);

    if (!notifyTemp) notifyTemp = checkIfNotRead(invites);

    setNotify(notifyTemp);
  }, [invites, notifications]);

  if (!show || !_id) return null;

  return (
    <>
      <NavBtn
        onClick={() => setOpened(!opened)}
        active={!opened}
        opened={opened}
        aria-label="Navigation"
        tabIndex={0}
        notify={notify && !opened}
      >
        <NavBtnIcon opened={opened} />
      </NavBtn>
      <MotionNavBackground
        initial={false}
        animate={opened ? 'open' : 'closed'}
        variants={animateBg}
      >
        <motion.ul variants={animateList}>
          <NavigationItem name="For you" linkTo="/" />
          <NavigationItem
            name="Profile"
            linkTo={`/profile/${_id}`}
            type="profile"
          />
          <NavigationItem name="Friends" linkTo="/friends" />
          <NavigationItem
            name="Notifications"
            linkTo="/notifications"
            type="notifications"
          />
        </motion.ul>
      </MotionNavBackground>
    </>
  );
};

export default Navigation;
