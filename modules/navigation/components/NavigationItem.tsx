import { FC } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { animateItem } from '../animations/NavigationItem.animations';

interface Props {
  name: string;
  linkTo: string;
}

const NavigationItem: FC<Props> = ({ name, linkTo }) => {
  return (
    <motion.li variants={animateItem}>
      <Link href={linkTo}>
        <a>{name}</a>
      </Link>
    </motion.li>
  );
};

export default NavigationItem;
