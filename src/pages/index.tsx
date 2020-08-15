import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading } from '@chakra-ui/core';

const IndexPage: NextPage = () => (
  <PageBase>
    <Heading fontFamily={'mono'}>Hello World</Heading>
  </PageBase>
);

export default IndexPage;
