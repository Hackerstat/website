import * as React from '../../../node_modules/react';
import { NextPage } from '../../../node_modules/next';
import SettingsPage from '../../Components/SettingsPage';
import { Heading, FormControl, FormLabel, Input, FormHelperText } from '../../../node_modules/@chakra-ui/core';

const AboutPage: NextPage = () => (
  <SettingsPage>
    <Heading> Hello</Heading>
    <FormControl>
      <FormLabel htmlFor="email">Email address</FormLabel>
      <Input type="email" id="email" aria-describedby="email-helper-text" />
      <FormHelperText id="email-helper-text">{"We'll never share your email."}</FormHelperText>
    </FormControl>
  </SettingsPage>
);

export default AboutPage;
