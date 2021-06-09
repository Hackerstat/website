import { checkStackOverflowUsernameSchema, CheckStackOverflowUsernameSchemaType } from '../../schemas';

export const checkStackOverflowUsernameValidator = async (
  query: unknown,
): Promise<CheckStackOverflowUsernameSchemaType> => {
  return await checkStackOverflowUsernameSchema.validate(query);
};
