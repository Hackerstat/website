import { checkStackOverflowUsernameSchema } from '../../schemas';

export const checkStackOverflowUsernameValidator = async (query: unknown): Promise<void> => {
  await checkStackOverflowUsernameSchema.validate(query);
};
