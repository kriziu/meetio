import { FC, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  NavBackground,
  NavBtn,
  NavBtnIcon,
  variant,
} from '../styles/Navigation.elements';

const MNavBackground = motion(NavBackground);

const Navigation: FC = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (router.pathname === '/login' || router.pathname === '/register')
      setShow(false);
    else setShow(true);
  }, [router.pathname]);

  return (
    <>
      {show && (
        <>
          <NavBtn
            onClick={() => setOpened(!opened)}
            active={!opened}
            opened={opened}
            aria-label="Navigation"
          >
            <NavBtnIcon opened={opened} />
          </NavBtn>
          <MNavBackground
            initial={false}
            animate={opened ? 'open' : 'closed'}
            variants={variant}
          >
            <ul onClick={() => setOpened(false)}>
              <li>
                <Link href="/">
                  <a>For you</a>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/friends">
                  <a>Friends</a>
                </Link>
              </li>
              <li>
                <Link href="/notifications">
                  <a>Notifications</a>
                </Link>
              </li>
            </ul>
          </MNavBackground>
        </>
      )}
    </>
  );
};

export default Navigation;
