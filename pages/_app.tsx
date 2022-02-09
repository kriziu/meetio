import { FC } from 'react';
import type { AppProps } from 'next/app';

import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserProvider from 'common/context/userContext';

import { GlobalStyles } from 'common/styles/GlobalStyles';
import Navigation from 'modules/navigation/components/Navigation';
import { Circle } from 'common/components/Shapes/Circle.elements';
import { Background } from 'common/components/Background';
import Search from 'modules/search/components/Search';
import StoreProvider from 'common/context/storeContext';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <UserProvider>
      <StoreProvider>
        <ToastContainer
          position="top-center"
          toastStyle={{
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
          }}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          closeButton={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <GlobalStyles />
        <Navigation />

        <div>
          <Circle radius={30} position={{ x: 30, y: 50 }} />
          <Circle radius={10} position={{ x: 45, y: 85 }} secondary={1} />
          <Circle radius={11} position={{ x: 95, y: 70 }} />
          <Circle radius={13} position={{ x: 75, y: 20 }} secondary={1} />
        </div>
        <Background />
        <div style={{ padding: '2rem' }}>
          <Search />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
      </StoreProvider>
    </UserProvider>
  );
};

export default MyApp;
