import { FC, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import {
  NavBackground,
  NavBtn,
  NavBtnIcon,
} from '../styles/Navigation.elements';
import { animateBg, animateList } from '../animations/Navigation.animations';
import NavigationItem from './NavigationItem';

const MotionNavBackground = motion(NavBackground);

const Navigation: FC = () => {
  const router = useRouter();

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

  return (
    <>
      {show && (
        <>
          <NavBtn
            onClick={() => setOpened(!opened)}
            active={!opened}
            opened={opened}
            aria-label="Navigation"
            tabIndex={0}
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
              <NavigationItem name="Profile" linkTo="/profile" />
              <NavigationItem name="Friends" linkTo="/friends" />
              <NavigationItem name="Notifications" linkTo="/notifications" />
            </motion.ul>
          </MotionNavBackground>
        </>
      )}
    </>
  );
};

export default Navigation;
