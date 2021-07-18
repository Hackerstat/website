import Axios from 'axios';
import { wakaTimeLanguagePieDataValidator } from '../../validation';
import { WakaTimeLanguagesGraphDataPropsType } from '../../../types';

export const fetchWakaTimeLanguagesData = async (url: string): Promise<WakaTimeLanguagesGraphDataPropsType> => {
  const wakaTimeLanguagePieData = (await Axios.get(url)).data;
  await wakaTimeLanguagePieDataValidator(wakaTimeLanguagePieData);
  const { data } = wakaTimeLanguagePieData;

  return data;
};
