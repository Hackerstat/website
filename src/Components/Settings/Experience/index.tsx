import React, { FunctionComponent, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Checkbox, Stack, Button, Textarea } from '@chakra-ui/core';
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

const FormWidth = ['min(800px, 90vw)', 'sm', 'xs'];

interface ExperienceProps {
  initialValues?: Partial<ExperienceFormFields>;
  onClose?: (experience: ExperienceFormFields) => void;
}

const Experience: FunctionComponent<ExperienceProps> = ({ initialValues, onClose }) => {
  useEffect(() => {
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  const [isCurrentPosition, setIsCurrentPosition] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      companyName: initialValues?.companyName || '',
      position: initialValues?.position || '',
      startingDate: initialValues?.startingDate || undefined,
      endDate: initialValues?.endDate || undefined,
    },
    onSubmit: async (values) => {
      try {
        await Axios.post('/api/settings/workexperience', values);
      } catch (e) {
        console.error(e);
      }
      formik.setSubmitting(false);
      onClose(values as ExperienceFormFields);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: '100%',
      }}
    >
      <Stack shouldWrapChildren spacing={2} width={'100%'}>
        <Stack isInline shouldWrapChildren spacing={2} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
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

        <Stack isInline shouldWrapChildren spacing={2} flexWrap={'wrap'} width={'100%'} justifyContent={'flex-start'}>
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
      <Button textAlign={'right'} mt={'2em'} variantColor="teal" isLoading={formik.isSubmitting} type="submit">
        Done
      </Button>
    </form>
  );
};

export default Experience;
