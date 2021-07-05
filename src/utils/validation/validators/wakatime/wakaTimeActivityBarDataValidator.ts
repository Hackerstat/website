import { WakaTimeActivityBarDataSchema, WakaTimeActivityBarDataSchemaType } from '../../schemas';

export const wakaTimeActivityBarDataValidator = async (
  wakaTimeActivityBarData: unknown,
): Promise<WakaTimeActivityBarDataSchemaType> => {
  return await WakaTimeActivityBarDataSchema.validate(wakaTimeActivityBarData);
};
