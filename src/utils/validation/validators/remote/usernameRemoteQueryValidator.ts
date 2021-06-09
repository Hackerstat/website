import { usernameQuerySchema, UsernameQuerySchemaType } from '../../schemas';

export const usernameRemoteQueryValidator = async (username: unknown): Promise<UsernameQuerySchemaType> => {
  return await usernameQuerySchema.validate(username);
};
