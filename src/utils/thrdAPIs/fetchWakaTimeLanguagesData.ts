import Axios from 'axios';
import { wakaTimeLanguagePieDataValidator } from '../validation';
import { WakaTimeActivityGraphDataPropsType } from '../utils';

export const fetchWakaTimeLanguagesData = async (url: string): Promise<WakaTimeActivityGraphDataPropsType> => {
  const wakaTimeLanguagePieData = (await Axios.get(url)).data;
  await wakaTimeLanguagePieDataValidator(wakaTimeLanguagePieData);
  const { data } = wakaTimeLanguagePieData;

  return data;
};
