import { FC, useContext, useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import axios from 'axios';

import { storeContext } from 'common/context/storeContext';

import { Header1 } from 'common/components/Headers';
import Notification from './Notification';
import { animateList } from 'common/animations/list.animations';
import useObserverRead from 'common/hooks/useObserverRead';

const Notifications: FC = () => {
  const { notifications } = useContext(storeContext);

  const { listRef, childrenRefs } = useObserverRead('/api/read/notifications');

  return (
    <div>
      <Header1>Notifications</Header1>
      <motion.ul
        variants={animateList}
        initial="hidden"
        animate="show"
        ref={listRef}
        style={{ overflow: 'scroll', height: '50rem' }}
      >
        {notifications.map((notification, index) => (
          <Notification
            {...notification}
            key={notification._id}
            childrenRefs={childrenRefs}
            index={index}
          />
        ))}
      </motion.ul>
    </div>
  );
};

export default Notifications;
