import { retrieveDribbblePiecesSchema, RetrieveDribbblePiecesSchemaType } from '../..';

export const retrieveDribbblePiecesValidator = async (query: unknown): Promise<RetrieveDribbblePiecesSchemaType> => {
  return await retrieveDribbblePiecesSchema.validate(query);
};
