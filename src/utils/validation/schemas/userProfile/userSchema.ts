import * as yup from 'yup';

export const userSchema = yup.object().shape({
  user: yup
    .string()
    .trim()
    .test('length', 'name must be less than 51 chars', (name: string) => name.length <= 50)
    .required(),
});
