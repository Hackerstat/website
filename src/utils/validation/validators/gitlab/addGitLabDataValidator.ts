import { addGitLabDataSchema, AddGitLabDataSchemaType } from '../..';

export const addGitLabDataValidator = async (body: unknown): Promise<AddGitLabDataSchemaType> => {
  return await addGitLabDataSchema.validate(body);
};
