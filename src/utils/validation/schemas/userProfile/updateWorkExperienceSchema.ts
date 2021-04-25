import * as yup from 'yup';

export const updateWorkExperienceSchema = yup
  .object()
  .shape({
    i: yup
      .mixed()
      .test('number', 'must be a number', (num) => {
        try {
          return typeof parseInt(num) === 'number';
        } catch (e) {
          return false;
        }
      })
      .required(),
    companyName: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 101 chars', (name: string) => name && name.length <= 100)
      .notRequired(),
    position: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 75 chars', (name: string) => name && name.length <= 76)
      .notRequired(),
    startingDate: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 31 chars', (name: string) => name && name.length <= 30)
      .notRequired(),
    endDate: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 31 chars', (name: string) => name && name.length <= 30)
      .notRequired(),
    details: yup
      .string()
      .strict(true)
      .trim()
      .test('length', 'name must be less than 31 chars', (name: string) => name && name.length <= 30)
      .notRequired(),
  })
  .strict(true)
  .required();
