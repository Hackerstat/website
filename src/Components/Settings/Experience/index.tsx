import React, { FunctionComponent, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  Stack,
  Button,
  Textarea,
  Flex,
} from '@chakra-ui/react';
import Axios from 'axios';

export interface ExperienceFormFields {
  companyName: string;
  position: string;
  startingDate: Date;
  endDate: Date;
  details: string;
}

type validationErrors = {
  [P in keyof ExperienceFormFields]?: string;
};

type IndexType = number | null | undefined;

const FormWidth = ['min(800px, 90vw)', 'sm', 'xs'];

interface ExperienceProps {
  initialValues?: Partial<ExperienceFormFields>;
  onClose?: (experience: ExperienceFormFields) => void;
  index: IndexType;
}

const checkIndex = (index: IndexType) => typeof index === 'number';

/**
 * @name Experience
 * @description This component is the form for users to input their experience info.
 * @author @LouisIV
 * @param {ExperienceProps} props It is the prop object of the component.
 * @param {Partial<ExperienceFormFields>} props.initalValues This object contains all the inital values to fill in for the work experience form.
 * @param {(experience: ExperienceFormFields) => void} props.onClose This function when executed closes the pop-up component it exists in and saves the work experience.
 * @param {IndexType} props.index This is the index that keeps track if the form is editing an existing work experience instance or creating a new one.
 * @returns {FunctionComponent<ExperienceProps>}
 */
const Experience: FunctionComponent<ExperienceProps> = ({ initialValues, onClose, index }) => {
  useEffect(() => {
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  const [isCurrentPosition, setIsCurrentPosition] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(false);

  const validateForm = (values: Partial<ExperienceFormFields>) => {
    const errors: validationErrors = {};

    if (!values.companyName) {
      errors.companyName = 'Required';
    }

    if (!values.position) {
      errors.position = 'Required';
    }

    if (!values.startingDate) {
      errors.startingDate = 'Required';
    }

    if (!values.details) {
      errors.details = 'Required';
    }

    if (!isCurrentPosition && !values.endDate) {
      errors.endDate = 'Required';
    }

    if (!isCurrentPosition && values.endDate < values.startingDate) {
      errors.endDate = 'End Date cannot be before start date';
    }

    return errors;
  };
  console.log(initialValues);

  const formik = useFormik({
    initialValues: {
      companyName: checkIndex(index) ? initialValues?.companyName : '',
      position: checkIndex(index) ? initialValues?.position : '',
      startingDate: checkIndex(index) ? initialValues?.startingDate : undefined,
      endDate: checkIndex(index) ? initialValues?.endDate : undefined,
      details: checkIndex(index) ? initialValues?.details : '',
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        if (typeof index === 'number') {
          if (!toBeDeleted) {
            await Axios.patch('/api/settings/workexperience', { ...values, i: index });
          } else {
            await Axios.delete('/api/settings/workexperience', { params: { ...values, i: index } });
            values = {};
          }
        } else {
          await Axios.post('/api/settings/workexperience', values);
        }
      } catch (e) {
        console.error(e);
      }
      formik.setSubmitting(false);
      onClose(values as ExperienceFormFields);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  // TODO: Add starting value for dates when edits experience and add editing for experience.
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: '100%',
      }}
    >
      <Stack shouldWrapChildren spacing={2} width={'100%'}>
        <Stack flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
          <FormControl isInvalid={!!formik.errors.companyName}>
            <FormLabel htmlFor="companyName">Company Name</FormLabel>
            <Input
              id="companyName"
              placeholder="Company"
              minW={FormWidth}
              onChange={formik.handleChange}
              value={formik.values.companyName}
            />
            <FormErrorMessage>{formik.errors.companyName}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.position}>
            <FormLabel htmlFor="position">Name of Position Held</FormLabel>
            <Input
              id="position"
              placeholder="Position"
              onChange={formik.handleChange}
              value={formik.values.position}
              minW={FormWidth}
            />
            <FormErrorMessage>{formik.errors.position}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Checkbox
          onChange={(e) => {
            setIsCurrentPosition(e.target.checked);
            formik.setFieldError('endDate', null);
          }}
        >
          I currently work here
        </Checkbox>

        <Stack width={'100%'} justifyContent={'flex-start'}>
          <FormControl isInvalid={!!formik.errors.startingDate}>
            <FormLabel htmlFor="startingDate">Date of Position Held From</FormLabel>
            <Input
              type="month"
              id="startingDate"
              placeholder=""
              min="1980-01"
              onChange={formik.handleChange}
              minW={FormWidth}
            />
            <FormErrorMessage>{formik.errors.startingDate}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.endDate}>
            <FormLabel htmlFor="endDate">Date of Position Held To</FormLabel>
            <Input
              isDisabled={isCurrentPosition}
              type="month"
              id="endDate"
              placeholder=""
              min="1980-01"
              onChange={formik.handleChange}
              minW={FormWidth}
            />
            <FormErrorMessage>{formik.errors.endDate}</FormErrorMessage>
          </FormControl>
        </Stack>

        <FormControl isInvalid={!!formik.errors.details}>
          <FormLabel htmlFor="details">Details</FormLabel>
          <Textarea
            id="details"
            placeholder="What did you accomplish in this position?"
            onChange={formik.handleChange}
            minW={FormWidth}
          />
          <FormErrorMessage>{formik.errors.details}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Flex justifyContent="space-between">
        <Button textAlign={'right'} mt={'2em'} colorScheme="teal" isLoading={formik.isSubmitting} type="submit">
          Done
        </Button>
        {initialValues ? (
          <Button
            _hover={{ backgroundColor: 'red.700' }}
            textAlign={'right'}
            mt={'2em'}
            backgroundColor="red.600"
            isLoading={formik.isSubmitting}
            type="submit"
            onClick={() => setToBeDeleted(true)}
          >
            Delete
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </form>
  );
};

export default Experience;
