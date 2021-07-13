import * as yup from 'yup';

export const retrieveDribbblePiecesSchema = yup.object().shape({
  dribbbleUsername: yup.string().required().nullable(false).strict(true).trim(),
});

export type RetrieveDribbblePiecesSchemaType = yup.InferType<typeof retrieveDribbblePiecesSchema>;
