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

const ProfileInfo = () => {
  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  return (
    <Flex flexDirection={'column'}>
      <Box maxW={'50em'} w={'100%'}>
        <Formik
          initialValues={{}}
          onSubmit={async (values, actions) => {
            try {
              await fetch('/api/profilesettings/chris/workexperience', {
                method: 'post',
                body: JSON.stringify(values),
              });
            } catch (e) {
              alert('Could not save work experience. Please send again.');
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Box mt={'3em'} minW={'50%'} maxW={'50%'}>
                <Text>Work Experience #1</Text>
                <Field name="name_of_WE1" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name_of_WE1}>
                      <FormLabel htmlFor="name_of_WE1">Company Name</FormLabel>
                      <Input {...field} id="name_of_WE1" placeholder="Company#1" maxW={'50%'} />
                      <FormErrorMessage>{form.errors.name_of_WE1}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

const ProfileInfoPage: NextPage = () => (
  <SettingsPage title="My Profile Information">
    <ProfileInfo />
  </SettingsPage>
);

export default ProfileInfoPage;
