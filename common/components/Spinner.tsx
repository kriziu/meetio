import { FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

import { Flex } from './Flex';

const MotionFlex = motion(Flex);

const Spinner: FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <MotionFlex
          style={{ height: '100%', width: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ClipLoader color="white" loading={true} size={100} />
        </MotionFlex>
      )}
    </AnimatePresence>
  );
};

export const BigSpinner: FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <Flex
      style={{
        height: '100%',
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        backgroundColor: 'black',
        opacity: loading ? 0.3 : 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <ClipLoader color="white" loading={true} size={100} />
    </Flex>
  );
};

export default Spinner;
