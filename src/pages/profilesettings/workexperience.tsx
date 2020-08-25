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

function WorkExperienceForm() {
  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  function validateDate(value) {
    let error;
    if (!value) {
      error = 'Date is required';
    }
    return error;
  }

  return (
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
            <Field name="position1" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.position1}>
                  <FormLabel htmlFor="position1">Name of Position Held</FormLabel>
                  <Input {...field} id="position1" placeholder="Position#1" />
                  <FormErrorMessage>{form.errors.position1}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex flexDirection={'row'} width={'100%'}>
              <Box mr={3}>
                <Field name="dateFrom1" validate={validateDate}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.dateFrom1}>
                      <FormLabel htmlFor="dateFrom1">Date of Position Held From</FormLabel>
                      <Input {...field} type="month" id="dateFrom1" placeholder="" min="1980-01" />
                      <FormErrorMessage>{form.errors.dateFrom1}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box>
                <Field name="dateTo1" validate={validateDate}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.dateTo1}>
                      <FormLabel htmlFor="dateTo1">Date of Position Held To</FormLabel>
                      <Input {...field} type="month" id="dateTo1" placeholder="" min="1980-01" />
                      <FormErrorMessage>{form.errors.dateTo1}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
          </Box>
          <Box mt={'3em'} minW={'50%'} maxW={'50%'}>
            <Text>Work Experience #2</Text>
            <Field name="name_of_WE2" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name_of_WE2}>
                  <FormLabel htmlFor="name_of_WE2">Company Name</FormLabel>
                  <Input {...field} id="name_of_WE2" placeholder="Company#2" />
                  <FormErrorMessage>{form.errors.name_of_WE2}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="position2" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.position2}>
                  <FormLabel htmlFor="position2">Name of Position Held</FormLabel>
                  <Input {...field} id="position2" placeholder="Position#2" />
                  <FormErrorMessage>{form.errors.position2}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex flexDirection={'row'} width={'100%'}>
              <Box mr={3}>
                <Field name="dateFrom2" validate={validateDate}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.dateFrom2}>
                      <FormLabel htmlFor="dateFrom1">Date of Position Held From</FormLabel>
                      <Input {...field} type="month" id="dateFrom1" placeholder="" min="1980-01" />
                      <FormErrorMessage>{form.errors.dateFrom1}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box>
                <Field name="dateTo2" validate={validateDate}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.dateTo2}>
                      <FormLabel htmlFor="dateTo2">Date of Position Held To</FormLabel>
                      <Input {...field} type="month" id="dateTo2" placeholder="" min="1980-01" />
                      <FormErrorMessage>{form.errors.dateTo2}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
          </Box>
          <Box mt={'3em'} minW={'50%'} maxW={'50%'}>
            <Text>Work Experience #3</Text>
            <Field name="name_of_WE3" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name_of_WE3}>
                  <FormLabel htmlFor="name_of_WE3">Company Name</FormLabel>
                  <Input {...field} id="name_of_WE3" placeholder="Company#3" />
                  <FormErrorMessage>{form.errors.name_of_WE3}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="position3" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.position3}>
                  <FormLabel htmlFor="position3">Name of Position Held</FormLabel>
                  <Input {...field} id="position3" placeholder="Position#3" />
                  <FormErrorMessage>{form.errors.position3}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex flexDirection={'row'} width={'100%'}>
              <Box mr={3}>
                <Field name="dateFrom3" validate={validateDate}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.dateFrom3}>
                      <FormLabel htmlFor="dateFrom3">Date of Position Held From</FormLabel>
                      <Input {...field} type="month" id="dateFrom3" placeholder="" min="1980-01" />
                      <FormErrorMessage>{form.errors.dateFrom3}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box>
                <Field name="dateTo3" validate={validateDate}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.dateTo3}>
                      <FormLabel htmlFor="dateTo3">Date of Position Held To</FormLabel>
                      <Input {...field} type="month" id="dateTo3" placeholder="" min="1980-01" />
                      <FormErrorMessage>{form.errors.dateTo3}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
          </Box>

          <Button mt={'2em'} variantColor="teal" isLoading={props.isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}

const WorkExperiencePage: NextPage = () => (
  <SettingsPage>
    <Text>Enter past Working Positions that you have held including position, time-length, and company name.</Text>
    <WorkExperienceForm />
  </SettingsPage>
);

export default WorkExperiencePage;
