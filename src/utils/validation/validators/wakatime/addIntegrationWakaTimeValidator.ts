import { addWakaTimeIntegrationSchema, addWakaTimeIntegrationSchemaType } from '../../schemas';

export const addWakaTimeIntegrationValidator = async (query: unknown): Promise<addWakaTimeIntegrationSchemaType> => {
  return await addWakaTimeIntegrationSchema.validate(query);
};
