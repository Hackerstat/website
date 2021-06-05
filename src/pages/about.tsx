import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading } from '@chakra-ui/react';

const AboutPage: NextPage = () => (
  <PageBase>
    <Heading color={'primary-bg'}>About Page</Heading>
  </PageBase>
);

export default AboutPage;
