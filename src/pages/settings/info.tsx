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
  useToast,
} from '../../../node_modules/@chakra-ui/core';
import { Formik, Field } from '../../../node_modules/formik';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import Axios from 'axios';

import * as Yup from 'yup';

const InfoSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email'),
  website: Yup.string().url(),
  school: Yup.string().min(2, 'Too Short!').max(120, 'Too Long'),
  bio: Yup.string().min(10, 'Too Short').max(240, 'Too Long!'),
});

const FormWidth = ['min(800px, 90vw)', 'sm', 'xs', 'md'];
const DoubleFormWidth = ['100%'];

const ProfileInfo = () => {
  const toast = useToast();

  return (
    <Flex flexDirection={'column'}>
      <Formik
        initialValues={{}}
        onSubmit={async (values, actions) => {
          try {
            await Axios.post('/api/settings/info', {
              ...values,
            });
            toast({
              title: 'Success',
              status: 'success',
              description: 'Updated profile information.',
            });
          } catch (e) {
            toast({
              title: 'Something Went Wrong',
              status: 'error',
              description: 'Could not save profile info. Please send again.',
            });
          }
          actions.setSubmitting(false);
        }}
        validationSchema={InfoSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} style={{ width: '100%' }}>
            <Stack isInline shouldWrapChildren spacing={2} flexWrap={'wrap'}>
              <Field name="firstName">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.firstName}>
                    <FormLabel htmlFor="firstName">First</FormLabel>
                    <Input {...field} id="firstName" placeholder="John" minW={FormWidth} />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }) => (
                  <FormControl isInvalid={!!form.errors.lastName}>
                    <FormLabel htmlFor="lastName">Last</FormLabel>
                    <Input {...field} id="lastName" placeholder="Doe" minW={FormWidth} />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Stack mt={2} isInline shouldWrapChildren spacing={2} flexWrap={'wrap'} justifyContent={'flex-start'}>
              <Field name="website">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.website}>
                    <FormLabel htmlFor="website">Website</FormLabel>
                    <Input {...field} id="website" placeholder="https:/..." minW={FormWidth} />
                    <FormErrorMessage>{form.errors.website}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="Email">
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
              <Field name="Location">
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
