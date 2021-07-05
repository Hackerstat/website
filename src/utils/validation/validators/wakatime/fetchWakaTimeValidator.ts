import { fetchWakaTimeSchema, FetchWakaTimeDataType } from '../../schemas';

export const fetchWakaTimeValidator = async (query: unknown): Promise<FetchWakaTimeDataType> => {
  return await fetchWakaTimeSchema.validate(query);
};
