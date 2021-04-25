import { addWorkExperienceSchema } from '../../schemas';

export const addWorkExperienceValidator = async (body: unknown): Promise<void> => {
  await addWorkExperienceSchema.validate(body);
};
