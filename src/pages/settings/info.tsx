import * as React from '../../../node_modules/react';
import { NextPage } from '../../../node_modules/next';
import SettingsPage from '../../Components/SettingsPage';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Stack,
  Button,
  Textarea,
} from '../../../node_modules/@chakra-ui/core';
import { Formik, Field } from '../../../node_modules/formik';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';

const FormWidth = ['min(800px, 90vw)', 'sm', 'xs', 'md'];
const DoubleFormWidth = ['100%'];

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
          <form onSubmit={props.handleSubmit} style={{ width: '100%' }}>
            <Stack isInline shouldWrapChildren spacing={2} flexWrap={'wrap'}>
              <Field name="userName" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.userName}>
                    <FormLabel htmlFor="userName">Username</FormLabel>
                    <Input {...field} id="userName" placeholder="John Doe" minW={FormWidth} />
                    <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} id="password" placeholder="******" minW={FormWidth} />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Stack mt={2} isInline shouldWrapChildren spacing={2} flexWrap={'wrap'} justifyContent={'flex-start'}>
              <Field name="website" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.website}>
                    <FormLabel htmlFor="website">Website</FormLabel>
                    <Input {...field} id="website" placeholder="https:/..." minW={FormWidth} />
                    <FormErrorMessage>{form.errors.website}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="Email" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.Email}>
                    <FormLabel htmlFor="Email">Email</FormLabel>
                    <Input {...field} id="Email" placeholder="johndoe@mail.com" minW={FormWidth} />
                    <FormErrorMessage>{form.errors.Email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Stack mt={2} spacing={2} flexWrap={'wrap'} justifyContent={'flex-start'} width={'100%'}>
              <Field name="Bio">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.Bio}>
                    <FormLabel htmlFor="Bio">Bio</FormLabel>
                    <Textarea {...field} id="Bio" placeholder="I did ..." type="text" minW={DoubleFormWidth} />
                    <FormErrorMessage>{form.errors.Bio}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Stack
              mt={4}
              isInline
              shouldWrapChildren
              spacing={2}
              flexWrap={'wrap'}
              width={'100%'}
              justifyContent={'flex-start'}
            >
              <Field name="University">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.University}>
                    <FormLabel htmlFor="University">University</FormLabel>
                    <Input {...field} id="University" placeholder="Stanford" type="text" minW={FormWidth} />
                    <FormErrorMessage>{form.errors.University}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="Location" validate={validateLocation}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.Location}>
                    <FormLabel htmlFor="Location">Location</FormLabel>
                    <Input {...field} id="Location" placeholder="Santa Cruz, California" type="text" minW={FormWidth} />
                    <FormErrorMessage>{form.errors.Location}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Flex flexDirection={'row'} justifyContent={'flex-start'}>
              <Button textAlign={'right'} mt={'2em'} variantColor="teal" isLoading={props.isSubmitting} type="submit">
                Submit
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

const ProfileInfoPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <SettingsPage>{mounted ? <ProfileInfo /> : <Loader />}</SettingsPage>;
};

export default ProfileInfoPage;
