import { mediumUserNameQuerySchema, MediumUsernameQuerySchemaType } from '../../schemas';

export const mediumUserNameQueryValidator = async (query: unknown): Promise<MediumUsernameQuerySchemaType> => {
  return await mediumUserNameQuerySchema.validate(query);
};
