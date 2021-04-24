import { userInfoSchema } from '../../schemas';

export const userInfoQueryValidator = async (body: unknown): Promise<void> => {
  await userInfoSchema.validate(body);
};
