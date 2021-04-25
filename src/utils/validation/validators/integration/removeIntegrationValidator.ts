import { removeIntegrationSchema } from '../../schemas';

export const removeIntegrationInSettingsValidator = async (body: unknown): Promise<void> => {
  await removeIntegrationSchema.validate(body);
};
