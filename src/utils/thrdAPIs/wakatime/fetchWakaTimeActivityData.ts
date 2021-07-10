import Axios from 'axios';
import { wakaTimeActivityBarDataValidator } from '../../validation';
import { WakaTimeActivityGraphDataPropsType } from '../../utils';

export const fetchWakaTimeActivityData = async (url: string): Promise<WakaTimeActivityGraphDataPropsType> => {
  const wakaTimeActivityBarData = (await Axios.get(url)).data;
  await wakaTimeActivityBarDataValidator(wakaTimeActivityBarData);

  const validatedData = wakaTimeActivityBarData.data.map(({ grand_total, range }) => ({
    hours: grand_total.hours,
    minutes: grand_total.minutes,
    hoursMinutesText: grand_total.text,
    dateText: range.date,
    rawDate: range.text,
  }));

  return validatedData;
};
