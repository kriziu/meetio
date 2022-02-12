import { FC, useContext } from 'react';

import { motion } from 'framer-motion';

import { storeContext } from 'common/context/storeContext';

import { Header1 } from 'common/components/Headers';
import Notification from './Notification';
import {
  animateList,
  animateListItem,
} from 'common/animations/list.animations';

const Notifications: FC = () => {
  const { notifications } = useContext(storeContext);

  return (
    <div>
      <Header1>Notifications</Header1>
      <motion.ul variants={animateList} initial="hidden" animate="show">
        {notifications.map(notification => (
          <motion.li variants={animateListItem} key={notification._id}>
            <Notification {...notification} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Notifications;
