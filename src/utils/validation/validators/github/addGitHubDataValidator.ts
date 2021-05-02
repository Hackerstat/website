import { addGitHubDataSchema, AddGitHubDataType } from '../../schemas';

export const addGitHubDataValidator = async (body: unknown): Promise<AddGitHubDataType> => {
  return await addGitHubDataSchema.validate(body);
};
