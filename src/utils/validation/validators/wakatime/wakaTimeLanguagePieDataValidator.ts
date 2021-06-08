import { WakaTimeLanguagePieDataSchema, WakaTimeLanguagePieDataSchemaType } from '../../schemas';

export const wakaTimeLanguagePieDataValidator = async (
  wakaTimeLanguageData: unknown,
): Promise<WakaTimeLanguagePieDataSchemaType> => {
  return await WakaTimeLanguagePieDataSchema.validate(wakaTimeLanguageData);
};
