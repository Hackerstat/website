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
  Textarea,
} from '../../../node_modules/@chakra-ui/core';
import { Formik, Field } from '../../../node_modules/formik';

const ProfileInfo = () => {
  function validateName(value) {
    let error;
    if (!value) {
      error = 'Value is required';
    }
    return error;
  }

  function validateLocation(value) {
    if (value && value.split(', ').length === 2) {
      return null;
    }
    return 'Location Name is not in correct form City,Country';
  }

  return (
    <Flex flexDirection={'column'}>
      <Box px={15} w={'100%'} minH={'46em'}>
        <Formik
          initialValues={{}}
          onSubmit={async (values, actions) => {
            try {
              await fetch('/api/profilesettings/chris/profileinfo', {
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
              <Flex flexDirection={'row'} flexWrap={'wrap'}>
                <Box mr={20} minW={'23em'}>
                  <Box mt={'3em'} minH={'6em'}>
                    <Field name="userName" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.userName}>
                          <FormLabel htmlFor="userName">Username</FormLabel>
                          <Input {...field} id="userName" placeholder="John Doe" maxW={'100%'} />
                          <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box mt={'3em'} minH={'6em'}>
                    <Field name="password" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.password}>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input {...field} id="password" placeholder="******" maxW={'100%'} />
                          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Box>
                <Box>
                  <Box mt={'3em'} minH={'6em'}>
                    <Field name="website" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.website}>
                          <FormLabel htmlFor="website">Website</FormLabel>
                          <Input {...field} id="website" placeholder="https:/..." minW={'23em'} />
                          <FormErrorMessage>{form.errors.website}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box mt={'3em'} minH={'6em'}>
                    <Field name="Email" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.Email}>
                          <FormLabel htmlFor="Email">Email</FormLabel>
                          <Input {...field} id="Email" placeholder="johndoe@mail.com" minW={'100%'} />
                          <FormErrorMessage>{form.errors.Email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Box>
              </Flex>
              <Flex flexDirection={'column'}>
                <Box mt={'3em'}>
                  <Field name="Bio">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.Bio}>
                        <FormLabel htmlFor="Bio">Bio</FormLabel>
                        <Textarea {...field} id="Bio" placeholder="I did ..." type="text" minW={'30em'} />
                        <FormErrorMessage>{form.errors.Bio}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Flex flexDirection={'row'} justifyContent={'flex-start'} flexWrap={'wrap'}>
                  <Box mt={'3em'} mr={'5em'}>
                    <Field name="University">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.University}>
                          <FormLabel htmlFor="University">University</FormLabel>
                          <Input {...field} id="University" placeholder="Stanford" type="text" minW={'23em'} />
                          <FormErrorMessage>{form.errors.University}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box mt={'3em'} pb={'3em'} minH={'10em'}>
                    <Field name="Location" validate={validateLocation}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.Location}>
                          <FormLabel htmlFor="Location">Location</FormLabel>
                          <Input
                            {...field}
                            id="Location"
                            placeholder="Santa Cruz, California"
                            type="text"
                            minW={'23em'}
                          />
                          <FormErrorMessage>{form.errors.Location}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Flex>
                <Flex flexDirection={'row'} justifyContent={'flex-end'}>
                  <Button
                    textAlign={'right'}
                    mt={'2em'}
                    variantColor="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
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
