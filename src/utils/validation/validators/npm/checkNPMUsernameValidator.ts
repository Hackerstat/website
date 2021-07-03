import { checkNPMUsernameSchema, CheckNPMUsernameSchemaType } from '../../schemas';

export const checkNPMUsernameValidator = async (username: unknown): Promise<CheckNPMUsernameSchemaType> => {
  return await checkNPMUsernameSchema.validate(username);
};
