import { userSchema } from '../../schemas';

export const userQueryValidator = async (query: unknown): Promise<void> => {
  await userSchema.validate(query);
};
