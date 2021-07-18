import * as yup from 'yup';

const MAX_NUM = Math.pow(2, 10);

const behancePieceSchema = yup.object().shape({
  link: yup.string().lowercase().url().required().trim().nullable(false),
  title: yup.string().required().nullable(false).trim(),
  image: yup.mixed(),
  likes: yup.number().max(MAX_NUM),
  watches: yup.number().max(MAX_NUM),
});

export const addBehancePiecesSchema = yup.object().shape({
  behanceUsername: yup.string().required().nullable(false).trim(),
  behanceWorkPieces: yup
    .array(behancePieceSchema)
    .required()
    .nullable(false)
    .test(
      'Behance Work Pieces Is Not Empty',
      'Length of Behance Work Pieces should not be empty',
      (workPieces) => workPieces && workPieces.length > 0,
    )
    .test(
      'Number of Behance Work Pieces',
      'Number of Behance Work Pieces Should Be 24 or fewer',
      (workPieces) => workPieces && workPieces.length <= 24,
    ),
  sub: yup.mixed(),
  isValidated: yup.bool().default(false),
});

export type AddBehancePiecesSchemaType = yup.InferType<typeof addBehancePiecesSchema>;
