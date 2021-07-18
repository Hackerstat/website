import * as yup from 'yup';

export const retrieveBehancePiecesSchema = yup.object().shape({
  behanceUsername: yup.string().required().nullable(false).strict(true).trim(),
});

export type RetrieveBehancePiecesSchemaType = yup.InferType<typeof retrieveBehancePiecesSchema>;
