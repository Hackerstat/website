import { addDribbblePiecesSchema, AddDribbblePiecesType } from '../../schemas';

export const addDribbblePiecesValidator = async (body: unknown): Promise<AddDribbblePiecesType> => {
  return await addDribbblePiecesSchema.validate(body);
};
