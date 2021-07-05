import * as yup from 'yup';

export const usernameQuerySchema = yup.object().shape({
  username: yup.string().trim().required(),
});

export type UsernameQuerySchemaType = yup.InferType<typeof usernameQuerySchema>;
