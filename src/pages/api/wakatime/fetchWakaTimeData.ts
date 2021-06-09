import { NextApiRequest, NextApiResponse } from 'next';
import Axios from 'axios';
import { fetchWakaTimeValidator, wakaTimeLanguagePieDataValidator } from '../../../utils/validation';
import auth0 from '../../../utils/auth';
import { fetchWakaTimeActivityData, fetchWakaTimeLanguagesData } from '../../../utils/thrdAPIs';

import { HTTPCode } from '../../../utils/constants';

export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { url, dataType } = await fetchWakaTimeValidator(req.query);

      if (dataType === 'bar') {
        const validatedData = await fetchWakaTimeActivityData(url);
        res.status(HTTPCode.OK).json({ dataPoints: validatedData });
      } else {
        const validatedData = await fetchWakaTimeLanguagesData(url);
        res.status(HTTPCode.OK).json({ dataPoints: validatedData });
      }
    } else {
      res.status(HTTPCode.BAD_REQUEST).send('Bad HTTP Request');
    }
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
});
