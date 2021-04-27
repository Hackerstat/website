import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';
import '../Components/WakaTime/component.css';
import defaultTheme from '../themes/default';
import Layout from '../Components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Layout title={'Hackerstats'} description={'A better profile'}>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
