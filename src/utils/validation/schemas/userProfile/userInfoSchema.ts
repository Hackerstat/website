import * as yup from 'yup';

export const userInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is less than 61', (fN) => fN && fN.length <= 60),
  lastName: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is less than 61', (fN) => fN && fN.length <= 60),
  website: yup
    .string()
    .url() // Does not do all URLs.
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 300', (fN) => fN && fN.length <= 300),
  email: yup
    .string()
    .email()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 200', (fN) => fN && fN.length <= 200),
  bio: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 2000', (fN) => fN && fN.length <= 2000),
  school: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 200', (fN) => fN && fN.length <= 200),
  location: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 200', (fN) => fN && fN.length <= 200),
});
