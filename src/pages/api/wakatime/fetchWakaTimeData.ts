import { NextApiRequest, NextApiResponse } from 'next';
import Axios from 'axios';
import {
  fetchWakaTimeValidator,
  wakaTimeActivityBarDataValidator,
  wakaTimeLanguagePieDataValidator,
} from '../../../utils/validation';
import auth0 from '../../../utils/auth';
import { WakaTimeDataResType } from '../../../utils/utils';

import { HTTPCode } from '../../../utils/constants';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { url, dataType } = await fetchWakaTimeValidator(req.query);

      if (dataType === 'bar') {
        const wakaTimeActivityBarData = <WakaTimeDataResType>(await Axios.get(url)).data;
        await wakaTimeActivityBarDataValidator(wakaTimeActivityBarData);

        const validatedData = wakaTimeActivityBarData.data.map(({ grand_total, range }) => ({
          hours: grand_total.hours,
          minutes: grand_total.minutes,
          hoursMinutesText: grand_total.text,
          dateText: range.date,
          rawDate: range.text,
        }));
        res.status(HTTPCode.OK).json({ dataPoints: validatedData });
      } else {
        const wakaTimeLanguagePieData = (await Axios.get(url)).data;
        await wakaTimeLanguagePieDataValidator(wakaTimeLanguagePieData);
        const { data } = wakaTimeLanguagePieData;
        res.status(HTTPCode.OK).json({ dataPoints: data });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
});
