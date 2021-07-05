import * as React from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '../Components/WakaTime/component.css';
import defaultTheme from '../themes/default';
import Layout from '../Components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Layout title={'Hackerstats'} description={'A better profile'}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
