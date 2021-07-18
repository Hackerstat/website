import * as yup from 'yup';

const dribbblePieceSchema = yup.object().shape({
  img: yup.string().required().nullable(false).trim(),
  link: yup.string().required().nullable(false).trim(),
  title: yup.string().required().nullable(false).trim(),
});

export const addDribbblePiecesSchema = yup.object().shape({
  sub: yup.mixed(),
  dribbbleUsername: yup.string().required().nullable(false).strict(true).trim(),
  dribbblePieces: yup.array(dribbblePieceSchema).required().nullable(false),
  isValidated: yup.bool().default(false),
});

export type AddDribbblePiecesType = yup.InferType<typeof addDribbblePiecesSchema>;
export type DribbblePieceType = yup.InferType<typeof dribbblePieceSchema>;
