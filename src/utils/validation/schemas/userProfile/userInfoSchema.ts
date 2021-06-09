import * as yup from 'yup';

const infoMaxLength = {
  name: 60,
  website: 500,
  email: 200,
  bio: 2000,
  school: 200,
  location: 500,
};

export const userInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 60', (fN) => !fN || fN.length <= infoMaxLength.name),
  lastName: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 60', (fN) => !fN || fN.length <= infoMaxLength.name),
  website: yup
    .string()
    .url() // Does not do all URLs.
    .strict(true)
    .nullable()
    .notRequired()
    .test('length', 'length is no more than 500', (fN) => !fN || fN.length <= infoMaxLength.website),
  email: yup
    .string()
    .email()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 200', (fN) => !fN || fN.length <= infoMaxLength.email),
  bio: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 2000', (fN) => !fN || fN.length <= infoMaxLength.bio),
  school: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 200', (fN) => !fN || fN.length <= infoMaxLength.school),
  location: yup
    .string()
    .strict(true)
    .notRequired()
    .test('length', 'length is no more than 200', (fN) => !fN || fN.length <= infoMaxLength.location),
});
