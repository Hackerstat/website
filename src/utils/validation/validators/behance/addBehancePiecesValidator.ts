import { addBehancePiecesSchema, AddBehancePiecesSchemaType } from '../../';

export const addBehancePiecesValidator = async (body: unknown): Promise<AddBehancePiecesSchemaType> => {
  return await addBehancePiecesSchema.validate(body);
};
