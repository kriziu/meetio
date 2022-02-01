import { FC } from 'react';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'common/styles/GlobalStyles';
import Navigation from 'modules/navigation/components/Navigation';
import { Circle } from 'common/components/Shapes/Circle.elements';
import { Background } from 'common/components/Background';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Navigation />
      <div>
        <Circle radius={30} position={{ x: 30, y: 50 }} />
        <Circle radius={10} position={{ x: 45, y: 85 }} secondary={1} />
        <Circle radius={11} position={{ x: 95, y: 70 }} />
        <Circle radius={13} position={{ x: 75, y: 20 }} secondary={1} />
      </div>
      <Background />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
