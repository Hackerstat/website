import * as yup from 'yup';

export const usernameSchema = yup.object().shape({
  newUsername: yup
    .string()
    .strict(true)
    .trim()
    .test('length', 'name must be less than 51 chars', (name: string) => name.length <= 50)
    .required(),
});
