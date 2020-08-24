import * as React from 'react';
import { NextPage } from 'next';
import SettingsPage from '../../Components/SettingsPage';
import { Heading } from '@chakra-ui/core';

const AboutPage: NextPage = () => (
  <SettingsPage>
    <Heading> Hello</Heading>
  </SettingsPage>
);

export default AboutPage;
