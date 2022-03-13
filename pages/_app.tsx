import { FC } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { SWRConfig } from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserProvider from 'common/context/userContext';
import StoreProvider from 'common/context/storeContext';
import LoaderProvider from 'common/context/loaderContext';

import { GlobalStyles } from 'common/styles/GlobalStyles';
import Navigation from 'modules/navigation/components/Navigation';
import { Circle } from 'common/components/Shapes/Circle.elements';
import { Background } from 'common/components/Background';
import Search from 'modules/search/components/Search';
import PostProvider from 'common/context/postContext';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const padding = router.pathname === ('/login' || '/register') ? '0' : '2rem';

  return (
    <>
      <Head>
        <title>Meetio</title>
      </Head>
      <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: (url: string) => axios.get(url).then(res => res.data),
        }}
      >
        <UserProvider>
          <StoreProvider>
            <LoaderProvider>
              <PostProvider>
                <ToastContainer
                  position="top-center"
                  toastStyle={{
                    backgroundColor: 'var(--color-black)',
                    color: 'var(--color-white)',
                  }}
                  autoClose={3000}
                  closeButton={false}
                />
                <GlobalStyles />
                <Navigation />

                <div>
                  <Circle radius={30} position={{ x: 30, y: 50 }} />
                  <Circle
                    radius={10}
                    position={{ x: 45, y: 85 }}
                    secondary={1}
                  />
                  <Circle radius={11} position={{ x: 95, y: 70 }} />
                  <Circle
                    radius={13}
                    position={{ x: 75, y: 20 }}
                    secondary={1}
                  />
                </div>
                <Background />
                <div style={{ padding }}>
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
              </PostProvider>
            </LoaderProvider>
          </StoreProvider>
        </UserProvider>
      </SWRConfig>
    </>
  );
};

export default MyApp;
