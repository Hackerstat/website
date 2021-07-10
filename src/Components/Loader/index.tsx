import React, { FunctionComponent } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

const Loader: FunctionComponent = () => (
  <Flex height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
    <Spinner />
  </Flex>
);

export default Loader;
