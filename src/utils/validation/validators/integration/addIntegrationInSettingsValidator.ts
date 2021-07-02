import { addIntegrationInSettingsSchema, AddIntegrationInSettingsSchemaType } from '../../schemas';

export const addIntegrationInSettingsValidator = async (body: unknown): Promise<AddIntegrationInSettingsSchemaType> => {
  return await addIntegrationInSettingsSchema.validate(body);
};
