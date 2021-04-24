import { usernameSchema } from '../../schemas';

export const usernameQueryValidator = async (body: unknown): Promise<void> => {
  console.log(await usernameSchema.validate(body));
};
