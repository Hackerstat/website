import * as yup from 'yup';

export const checkStackOverflowUsernameSchema = yup.object().shape({
  username: yup
    .string()
    .strict(true)
    .trim()
    .test('length', 'name must be less than 51 chars', (name: string) => name.length <= 50)
    .required(),
});
