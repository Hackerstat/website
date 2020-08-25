import * as React from '../../../node_modules/react';
import { NextPage } from '../../../node_modules/next';
import SettingsPage from '../../Components/SettingsPage';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Flex,
} from '../../../node_modules/@chakra-ui/core';
import { Formik, Field } from '../../../node_modules/formik';

const ProfileInfoPage: NextPage = () => (
  <SettingsPage>
    <Text>Enter past Working Positions that you have held including position, time-length, and company name.</Text>
  </SettingsPage>
);

export default ProfileInfoPage;
