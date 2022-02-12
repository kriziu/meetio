import { FC } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { animateItem } from '../animations/NavigationItem.animations';
import { StyledA } from '../styles/NavigationItem.elements';

interface Props {
  name: string;
  linkTo: string;
}

const NavigationItem: FC<Props> = ({ name, linkTo }) => {
  return (
    <motion.li variants={animateItem}>
      <Link href={linkTo} passHref>
        <StyledA>{name}</StyledA>
      </Link>
    </motion.li>
  );
};

export default NavigationItem;
