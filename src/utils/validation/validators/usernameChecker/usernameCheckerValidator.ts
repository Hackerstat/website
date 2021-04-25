import { userNameCheckerQuerySchema } from '../../schemas';

export const userNameCheckerQueryValidator = async (query: unknown): Promise<void> => {
  await userNameCheckerQuerySchema.validate(query);
};
