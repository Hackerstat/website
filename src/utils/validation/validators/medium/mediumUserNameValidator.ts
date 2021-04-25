import { mediumUserNameQuerySchema } from '../../schemas';

export const mediumUserNameQueryValidator = async (query: unknown): Promise<void> => {
  await mediumUserNameQuerySchema.validate(query);
};
