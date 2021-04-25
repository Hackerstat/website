import { updateWorkExperienceSchema } from '../../schemas';

export const updateWorkExperienceValidator = async (body: unknown): Promise<void> => {
  await updateWorkExperienceSchema.validate(body);
};
