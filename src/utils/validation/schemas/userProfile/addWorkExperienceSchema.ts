import * as yup from 'yup';

export const addWorkExperienceSchema = yup
  .object()
  .shape({
    companyName: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 101 chars', (name: string) => name.length <= 100)
      .required(),
    position: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 75 chars', (name: string) => name.length <= 76)
      .required(),
    startingDate: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 31 chars', (name: string) => name.length <= 30)
      .required(),
    endDate: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 31 chars', (name: string) => name.length <= 30)
      .required(),
    details: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 31 chars', (name: string) => name.length <= 30)
      .required(),
  })
  .strict(true)
  .required();
