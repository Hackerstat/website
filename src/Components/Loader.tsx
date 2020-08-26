import React, { FunctionComponent } from 'react';
import { Spinner, Flex } from '@chakra-ui/core';

const Loader: FunctionComponent = () => (
  <Flex height={'100%'} width={'100%'}>
    <Spinner />
  </Flex>
);

export default Loader;
