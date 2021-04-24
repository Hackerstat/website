import * as yup from 'yup';

export const mediumUserNameQuerySchema = yup.object().shape({
  username: yup
    .string()
    .strict(true)
    .trim()
    .test('length', 'name must be no more than 50 chars', (name: string) => name.length <= 50)
    .required(),
});
