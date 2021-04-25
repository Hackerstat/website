import { addIntegrationInSettingsSchema } from '../../schemas';

export const addIntegrationInSettingsValidator = async (body: unknown): Promise<void> => {
  await addIntegrationInSettingsSchema.validate(body);
};
