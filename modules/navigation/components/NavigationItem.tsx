import { FC, useContext, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { storeContext } from 'common/context/storeContext';

import { animateItem } from '../animations/NavigationItem.animations';
import { StyledA } from '../styles/NavigationItem.elements';
import { checkIfNotRead } from 'common/lib/checkIfNotRead';

interface Props {
  name: string;
  linkTo: string;
  type?: 'notifications' | 'profile';
}

const NavigationItem: FC<Props> = ({ name, linkTo, type }) => {
  const { notifications, invites } = useContext(storeContext);

  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (type === 'notifications') {
      setNotify(checkIfNotRead(notifications));
    }
  }, [notifications, type]);

  useEffect(() => {
    if (type === 'profile') {
      setNotify(checkIfNotRead(invites));
    }
  }, [invites, type]);

  return (
    <motion.li variants={animateItem}>
      <Link href={linkTo} passHref>
        <StyledA notify={notify}>{name}</StyledA>
      </Link>
    </motion.li>
  );
};

export default NavigationItem;
