import { RetrieveBehancePiecesSchemaType, retrieveBehancePiecesSchema } from '../../schemas';

export const retrieveBehancePiecesValidator = async (body: unknown): Promise<RetrieveBehancePiecesSchemaType> => {
  return await retrieveBehancePiecesSchema.validate(body);
};
